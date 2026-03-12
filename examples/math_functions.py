import math

def add(a, b):
    return a + b

def subtract(a, b):
    return a - b

def multiply(a, b):
    return a * b

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def power(a, b):
    return a ** b

def square_root(a):
    if a < 0:
        raise ValueError("Cannot take square root of negative number")
    return math.sqrt(a)

def is_prime(n):
    if n <= 1:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

def factorial(n):
    if n < 0:
        raise ValueError("Factorial not defined for negative numbers")
    return math.factorial(n)

def permutations(n, k):
    return factorial(n) // factorial(n - k)

def combinations(n, k):
    return permutations(n, k) // factorial(k)

def fibonacci(n):
    if n < 0:
        raise ValueError("Negative index not allowed")
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

def mean(data):
    if not data:
        return 0
    return sum(data) / len(data)

def median(data):
    if not data:
        return 0
    sorted_data = sorted(data)
    n = len(sorted_data)
    mid = n // 2
    if n % 2 == 0:
        return (sorted_data[mid - 1] + sorted_data[mid]) / 2
    return sorted_data[mid]

def variance(data):
    if not data:
        return 0
    m = mean(data)
    return sum((x - m) ** 2 for x in data) / len(data)

def standard_deviation(data):
    return math.sqrt(variance(data))

def solve_quadratic(a, b, c):
    discriminant = b**2 - 4*a*c
    if discriminant < 0:
        return []
    elif discriminant == 0:
        return [-b / (2*a)]
    else:
        sqrt_disc = math.sqrt(discriminant)
        return [(-b + sqrt_disc) / (2*a), (-b - sqrt_disc) / (2*a)]

def is_palindrome(s):
    s = str(s).lower().replace(" ", "")
    return s == s[::-1]

def gcd(a, b):
    return math.gcd(a, b)

def lcm(a, b):
    if a == 0 or b == 0:
        return 0
    return abs(a * b) // gcd(a, b)

def convert_temp(val, from_scale, to_scale):
    if from_scale == "C" and to_scale == "F":
        return (val * 9/5) + 32
    if from_scale == "F" and to_scale == "C":
        return (val - 32) * 5/9
    return val

def calculate_bmi(weight, height):
    return weight / (height ** 2)

def circle_area(radius):
    return math.pi * radius**2

def sphere_volume(radius):
    return (4/3) * math.pi * radius**3

def hypotenuse(a, b):
    return math.hypot(a, b)

# List processing utilities
def find_max(data):
    return max(data) if data else None

def find_min(data):
    return min(data) if data else None

def filter_even(data):
    return [x for x in data if x % 2 == 0]

def filter_odd(data):
    return [x for x in data if x % 2 != 0]

def scale_list(data, factor):
    return [x * factor for x in data]

def unique_elements(data):
    return list(set(data))

