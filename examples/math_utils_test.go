```go
package main

import (
	"math"
	"reflect"
	"sort"
	"testing"
)

func TestAdd(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"simple addition", 1, 2, 3},
		{"negative numbers", -1, -2, -3},
		{"mixed signs", 1, -2, -1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Add(tt.a, tt.b); got != tt.want {
				t.Errorf("Add() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSubtract(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"simple subtraction", 1, 2, -1},
		{"negative numbers", -1, -2, 1},
		{"mixed signs", 1, -2, 3},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Subtract(tt.a, tt.b); got != tt.want {
				t.Errorf("Subtract() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMultiply(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"simple multiplication", 1, 2, 2},
		{"negative numbers", -1, -2, 2},
		{"mixed signs", 1, -2, -2},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Multiply(tt.a, tt.b); got != tt.want {
				t.Errorf("Multiply() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestDivide(t *testing.T) {
	tests := []struct {
		name    string
		a       int
		b       int
		want    int
		wantErr bool
	}{
		{"simple division", 4, 2, 2, false},
		{"negative numbers", -4, -2, 2, false},
		{"mixed signs", 4, -2, -2, false},
		{"division by zero", 4, 0, 0, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Divide(tt.a, tt.b)
			if (err != nil) != tt.wantErr {
				t.Errorf("Divide() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("Divide() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestFloatAdd(t *testing.T) {
	tests := []struct {
		name string
		a    float64
		b    float64
		want float64
	}{
		{"simple addition", 1.0, 2.0, 3.0},
		{"negative numbers", -1.0, -2.0, -3.0},
		{"mixed signs", 1.0, -2.0, -1.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := FloatAdd(tt.a, tt.b); got != tt.want {
				t.Errorf("FloatAdd() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestFloatDivide(t *testing.T) {
	tests := []struct {
		name    string
		a       float64
		b       float64
		want    float64
		wantErr bool
	}{
		{"simple division", 4.0, 2.0, 2.0, false},
		{"negative numbers", -4.0, -2.0, 2.0, false},
		{"mixed signs", 4.0, -2.0, -2.0, false},
		{"division by zero", 4.0, 0.0, 0.0, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := FloatDivide(tt.a, tt.b)
			if (err != nil) != tt.wantErr {
				t.Errorf("FloatDivide() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("FloatDivide() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestPower(t *testing.T) {
	tests := []struct {
		name string
		a    float64
		b    float64
		want float64
	}{
		{"simple power", 2.0, 3.0, 8.0},
		{"negative base", -2.0, 3.0, -8.0},
		{"negative exponent", 2.0, -3.0, 0.125},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Power(tt.a, tt.b); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Power() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSqrt(t *testing.T) {
	tests := []struct {
		name    string
		a       float64
		want    float64
		wantErr bool
	}{
		{"simple square root", 4.0, 2.0, false},
		{"negative number", -4.0, 0.0, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Sqrt(tt.a)
			if (err != nil) != tt.wantErr {
				t.Errorf("Sqrt() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Sqrt() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestSin(t *testing.T) {
	tests := []struct {
		name string
		a    float64
		want float64
	}{
		{"simple sine", 0.0, 0.0},
		{"sine of pi/2", math.Pi / 2, 1.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Sin(tt.a); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Sin() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCos(t *testing.T) {
	tests := []struct {
		name string
		a    float64
		want float64
	}{
		{"simple cosine", 0.0, 1.0},
		{"cosine of pi/2", math.Pi / 2, 0.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Cos(tt.a); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Cos() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestTan(t *testing.T) {
	tests := []struct {
		name string
		a    float64
		want float64
	}{
		{"simple tangent", 0.0, 0.0},
		{"tangent of pi/4", math.Pi / 4, 1.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Tan(tt.a); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Tan() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMean(t *testing.T) {
	tests := []struct {
		name string
		data []float64
		want float64
	}{
		{"simple mean", []float64{1.0, 2.0, 3.0}, 2.0},
		{"empty data", []float64{}, 0.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Mean(tt.data); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Mean() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMedian(t *testing.T) {
	tests := []struct {
		name string
		data []float64
		want float64
	}{
		{"simple median", []float64{1.0, 2.0, 3.0}, 2.0},
		{"even number of elements", []float64{1.0, 2.0, 3.0, 4.0}, 2.5},
		{"empty data", []float64{}, 0.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Median(tt.data); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("Median() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestGCD(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"simple GCD", 12, 15, 3},
		{"GCD with 1", 12, 1, 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := GCD(tt.a, tt.b); got != tt.want {
				t.Errorf("GCD() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestIsPrime(t *testing.T) {
	tests := []struct {
		name string
		n    int
		want bool
	}{
		{"simple prime", 7, true},
		{"not prime", 4, false},
		{"edge case", 1, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := IsPrime(tt.n); got != tt.want {
				t.Errorf("IsPrime() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestFibonacci(t *testing.T) {
	tests := []struct {
		name string
		n    int
		want int
	}{
		{"simple Fibonacci", 5, 5},
		{"edge case", 0, 0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Fibonacci(tt.n); got != tt.want {
				t.Errorf("Fibonacci() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestFactorial(t *testing.T) {
	tests := []struct {
		name    string
		n       int
		want    int
		wantErr bool
	}{
		{"simple factorial", 5, 120, false},
		{"edge case", 0, 1, false},
		{"negative number", -1, 0, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := Factorial(tt.n)
			if (err != nil) != tt.wantErr {
				t.Errorf("Factorial() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("Factorial() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMax(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"simple max", 1, 2, 2},
		{"equal numbers", 1, 1, 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Max(tt.a, tt.b); got != tt.want {
				t.Errorf("Max() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMin(t *testing.T) {
	tests := []struct {
		name string
		a    int
		b    int
		want int
	}{
		{"simple min", 1, 2, 1},
		{"equal numbers", 1, 1, 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Min(tt.a, tt.b); got != tt.want {
				t.Errorf("Min() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAbs(t *testing.T) {
	tests := []struct {
		name string
		a    int
		want int
	}{
		{"simple abs", 1, 1},
		{"negative number", -1, 1},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Abs(tt.a); got != tt.want {
				t.Errorf("Abs() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestCircleArea(t *testing.T) {
	tests := []struct {
		name string
		r    float64
		want float64
	}{
		{"simple circle area", 1.0, math.Pi},
		{"zero radius", 0.0, 0.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := CircleArea(tt.r); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("CircleArea() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestRectangleArea(t *testing.T) {
	tests := []struct {
		name string
		l    float64
		w    float64
		want float64
	}{
		{"simple rectangle area", 1.0, 2.0, 2.0},
		{"zero length", 0.0, 2.0, 0.0},
		{"zero width", 1.0, 0.0, 0.0},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := RectangleArea(tt.l, tt.w); math.Abs(got-tt.want) > 1e-9 {
				t.Errorf("RectangleArea() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestMatrixAdd(t *testing.T) {
	tests := []struct {
		name    string
		m1     [][]int
		m2     [][]int
		want   [][]int
		wantErr bool
	}{
		{"simple matrix addition", [][]int{{1, 2}, {3, 4}}, [][]int{{5, 6}, {7, 8}}, [][]int{{6, 8}, {10, 12}}, false},
		{"dimension mismatch", [][]int{{1, 2}, {3, 4}}, [][]int{{5, 6}, {7, 8}, {9, 10}}, nil, true},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := MatrixAdd(tt.m1, tt.m2)
			if (err != nil) != tt.wantErr {
				t.Errorf("MatrixAdd() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("MatrixAdd() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestAnd(t *testing.T) {
	tests := []struct {
		name string
		a    bool
		b    bool
		want bool
	}{
		{"simple and", true, true, true},
		{"and with false", true, false, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := And(tt.a, tt.b); got != tt.want {
				t.Errorf("And() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestOr(t *testing.T) {
	tests := []struct {
		name string
		a    bool
		b    bool
		want bool
	}{
		{"simple or", true, false, true},
		{"or with false", false, false, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := Or(tt.a, tt.b); got != tt.want {
				t.Errorf("Or() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestXor(t *testing.T) {
	tests := []struct {
		name string
		a    bool
		b    bool
		want bool
	}{
		{"simple xor", true, false, true},
		{"xor with same value", true, true, false},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t