#!/usr/bin/env python3
import os
import sys
import json
import re
import anthropic

def mask_data(text):
    """Mask sensitive information from the text."""
    if not isinstance(text, str):
        return text
    
    # Mask IPv4 addresses
    text = re.sub(r'\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b', '[MASKED_IP]', text)
    
    # Mask potential API keys/Secrets (long hex or alphanumeric strings)
    text = re.sub(r'\b[A-Za-z0-9+/]{32,}\b', '[MASKED_SECRET]', text)
    
    # Mask common email patterns
    text = re.sub(r'\b[\w\.-]+@[\w\.-]+\.\w+\b', '[MASKED_EMAIL]', text)
    
    return text

def audit_report():
    api_key = os.getenv("ANTHROPIC_API_KEY")
    report_path = "final-security-report.json"
    
    if not api_key:
        print("[AI Risk Audit] ❌ ANTHROPIC_API_KEY not set.")
        sys.exit(0) # Don't fail the pipeline, just skip
        
    if not os.path.exists(report_path):
        print(f"[AI Risk Audit] ⚠️ Report not found at {report_path}")
        return

    try:
        with open(report_path, "r", encoding="utf-8") as f:
            report_data = json.load(f)
    except Exception as e:
        print(f"[AI Risk Audit] ❌ Error reading report: {e}")
        return

    findings = report_data.get("findings", [])
    if not findings:
        print("[AI Risk Audit] No findings to audit.")
        return

    client = anthropic.Anthropic(api_key=api_key)
    print(f"[AI Risk Audit] 🚀 Auditing {len(findings)} findings with masking...")

    # Prepare masked data for LLM
    masked_findings = []
    for f in findings:
        masked_f = {
            "id": findings.index(f),
            "tool": f.get("tool"),
            "title": mask_data(f.get("title", "")),
            "match": mask_data(f.get("match", "")),
            "file": f.get("file")
        }
        masked_findings.append(masked_f)

    prompt = f"""You are a senior security architect. Review the following masked security findings and for each one:
    1. Assign a clinical risk level: CRITICAL, HIGH, MEDIUM, or LOW.
    2. Provide a concise, human-readable description of the vulnerability and why it matters.
    
    Findings for Review:
    {json.dumps(masked_findings, indent=2)}
    
    Return ONLY a JSON object where the key is the index and the value is another object: {{"severity": "...", "description": "..."}}.
    Example: {{"0": {{"severity": "HIGH", "description": "Exposure of AWS credentials could allow full account takeover."}}}}
    Do NOT include any other text.
    """

    try:
        message = client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system="You are a security risk assessor. Output ONLY valid JSON mapping index to an object with severity and description.",
            messages=[{"role": "user", "content": prompt}]
        )
        
        resp_text = message.content[0].text.strip()
        if resp_text.startswith("```json"):
            resp_text = resp_text.replace("```json", "").replace("```", "").strip()
            
        risk_map = json.loads(resp_text)
        
        # Merge risk levels and descriptions back into findings
        for idx, data in risk_map.items():
            try:
                finding = findings[int(idx)]
                finding["severity"] = data.get("severity", "LOW").upper()
                finding["ai_description"] = data.get("description", "")
            except (ValueError, IndexError):
                continue
                
        # Update summary counts
        severity_counts = {"CRITICAL": 0, "HIGH": 0, "MEDIUM": 0, "LOW": 0}
        for f in findings:
            sev = f.get("severity", "LOW")
            if sev in severity_counts:
                severity_counts[sev] += 1
        
        report_data["severity_summary"] = severity_counts
        
        # Save enriched report
        with open(report_path, "w", encoding="utf-8") as out:
            json.dump(report_data, out, indent=2)
            
        print("[AI Risk Audit] ✅ Enriched report with AI risk assessments.")

    except Exception as e:
        print(f"[AI Risk Audit] ❌ Error during AI audit: {e}")

if __name__ == "__main__":
    audit_report()
