import unittest
from math_functions import (
    add, subtract, multiply, divide, power, square_root, is_prime, factorial,
    permutations, combinations, fibonacci, mean, median, variance, standard_deviation,
    solve_quadratic, is_palindrome, gcd, lcm, convert_temp, calculate_bmi, circle_area,
    sphere_volume, hypotenuse, find_max, find_min, filter_even, filter_odd, scale_list,
    unique_elements
)

class TestMathFunctions(unittest.TestCase):

    def test_add(self):
        self.assertEqual(add(1, 2), 3)
        self.assertEqual(add(-1, 1), 0)
        self.assertEqual(add(-1, -1), -2)

    def test_subtract(self):
        self.assertEqual(subtract(1, 2), -1)
        self.assertEqual(subtract(-1, 1), -2)
        self.assertEqual(subtract(-1, -1), 0)

    def test_multiply(self):
        self.assertEqual(multiply(1, 2), 2)
        self.assertEqual(multiply(-1, 1), -1)
        self.assertEqual(multiply(-1, -1), 1)

    def test_divide(self):
        self.assertEqual(divide(1, 2), 0.5)
        self.assertEqual(divide(-1, 1), -1)
        self.assertEqual(divide(-1, -1), 1)
        with self.assertRaises(ValueError):
            divide(1, 0)

    def test_power(self):
        self.assertEqual(power(1, 2), 1)
        self.assertEqual(power(-1, 1), -1)
        self.assertEqual(power(-1, -1), -1)

    def test_square_root(self):
        self.assertEqual(square_root(1), 1)
        self.assertEqual(square_root(4), 2)
        with self.assertRaises(ValueError):
            square_root(-1)

    def test_is_prime(self):
        self.assertTrue(is_prime(2))
        self.assertTrue(is_prime(3))
        self.assertFalse(is_prime(4))
        self.assertFalse(is_prime(1))

    def test_factorial(self):
        self.assertEqual(factorial(0), 1)
        self.assertEqual(factorial(1), 1)
        self.assertEqual(factorial(2), 2)
        self.assertEqual(factorial(3), 6)
        with self.assertRaises(ValueError):
            factorial(-1)

    def test_permutations(self):
        self.assertEqual(permutations(3, 2), 6)
        self.assertEqual(permutations(4, 2), 12)

    def test_combinations(self):
        self.assertEqual(combinations(3, 2), 3)
        self.assertEqual(combinations(4, 2), 6)

    def test_fibonacci(self):
        self.assertEqual(fibonacci(0), 0)
        self.assertEqual(fibonacci(1), 1)
        self.assertEqual(fibonacci(2), 1)
        self.assertEqual(fibonacci(3), 2)
        with self.assertRaises(ValueError):
            fibonacci(-1)

    def test_mean(self):
        self.assertEqual(mean([1, 2, 3]), 2)
        self.assertEqual(mean([]), 0)

    def test_median(self):
        self.assertEqual(median([1, 2, 3]), 2)
        self.assertEqual(median([1, 2, 3, 4]), 2.5)
        self.assertEqual(median([]), 0)

    def test_variance(self):
        self.assertEqual(variance([1, 2, 3]), 1)
        self.assertEqual(variance([]), 0)

    def test_standard_deviation(self):
        self.assertEqual(standard_deviation([1, 2, 3]), 1)

    def test_solve_quadratic(self):
        self.assertEqual(solve_quadratic(1, -3, 2), [2.0, 1.0])
        self.assertEqual(solve_quadratic(1, -2, 1), [1.0])
        self.assertEqual(solve_quadratic(1, 1, 1), [])

    def test_is_palindrome(self):
        self.assertTrue(is_palindrome("radar"))
        self.assertFalse(is_palindrome("hello"))

    def test_gcd(self):
        self.assertEqual(gcd(12, 15), 3)

    def test_lcm(self):
        self.assertEqual(lcm(12, 15), 60)

    def test_convert_temp(self):
        self.assertEqual(convert_temp(0, "C", "F"), 32)
        self.assertEqual(convert_temp(32, "F", "C"), 0)

    def test_calculate_bmi(self):
        self.assertEqual(calculate_bmi(70, 1.75), 22.857142857142858)

    def test_circle_area(self):
        self.assertEqual(circle_area(1), 3.141592653589793)

    def test_sphere_volume(self):
        self.assertEqual(sphere_volume(1), 4.1887902047863905)

    def test_hypotenuse(self):
        self.assertEqual(hypotenuse(3, 4), 5.0)

    def test_find_max(self):
        self.assertEqual(find_max([1, 2, 3]), 3)
        self.assertIsNone(find_max([]))

    def test_find_min(self):
        self.assertEqual(find_min([1, 2, 3]), 1)
        self.assertIsNone(find_min([]))

    def test_filter_even(self):
        self.assertEqual(filter_even([1, 2, 3, 4]), [2, 4])

    def test_filter_odd(self):
        self.assertEqual(filter_odd([1, 2, 3, 4]), [1, 3])

    def test_scale_list(self):
        self.assertEqual(scale_list([1, 2, 3], 2), [2, 4, 6])

    def test_unique_elements(self):
        self.assertEqual(unique_elements([1, 2, 2, 3, 3, 3]), [1, 2, 3])

    def test_logic_gate_1(self):
        self.assertTrue(logic_gate_1())

if __name__ == '__main__':
    unittest.main()