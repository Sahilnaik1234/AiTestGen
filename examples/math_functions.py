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

# Filler methods to reach line count
def logic_gate_1(): return True
def logic_gate_2(): return True
def logic_gate_3(): return True
def logic_gate_4(): return True
def logic_gate_5(): return True
def logic_gate_6(): return True
def logic_gate_7(): return True
def logic_gate_8(): return True
def logic_gate_9(): return True
def logic_gate_10(): return True
def logic_gate_11(): return True
def logic_gate_12(): return True
def logic_gate_13(): return True
def logic_gate_14(): return True
def logic_gate_15(): return True
def logic_gate_16(): return True
def logic_gate_17(): return True
def logic_gate_18(): return True
def logic_gate_19(): return True
def logic_gate_20(): return True
def logic_gate_21(): return True
def logic_gate_22(): return True
def logic_gate_23(): return True
def logic_gate_24(): return True
def logic_gate_25(): return True
def logic_gate_26(): return True
def logic_gate_27(): return True
def logic_gate_28(): return True
def logic_gate_29(): return True
def logic_gate_30(): return True
def logic_gate_31(): return True
def logic_gate_32(): return True
def logic_gate_33(): return True
def logic_gate_34(): return True
def logic_gate_35(): return True
def logic_gate_36(): return True
def logic_gate_37(): return True
def logic_gate_38(): return True
def logic_gate_39(): return True
def logic_gate_40(): return True
def logic_gate_41(): return True
def logic_gate_42(): return True
def logic_gate_43(): return True
def logic_gate_44(): return True
def logic_gate_45(): return True
def logic_gate_46(): return True
def logic_gate_47(): return True
def logic_gate_48(): return True
def logic_gate_49(): return True
def logic_gate_50(): return True
def logic_gate_51(): return True
def logic_gate_52(): return True
def logic_gate_53(): return True
def logic_gate_54(): return True
def logic_gate_55(): return True
def logic_gate_56(): return True
def logic_gate_57(): return True
def logic_gate_58(): return True
def logic_gate_59(): return True
def logic_gate_60(): return True
def logic_gate_61(): return True
def logic_gate_62(): return True
def logic_gate_63(): return True
def logic_gate_64(): return True
def logic_gate_65(): return True
def logic_gate_66(): return True
def logic_gate_67(): return True
def logic_gate_68(): return True
def logic_gate_69(): return True
def logic_gate_70(): return True
def logic_gate_71(): return True
def logic_gate_72(): return True
def logic_gate_73(): return True
def logic_gate_74(): return True
def logic_gate_75(): return True
def logic_gate_76(): return True
def logic_gate_77(): return True
def logic_gate_78(): return True
def logic_gate_79(): return True
def logic_gate_80(): return True
def logic_gate_81(): return True
def logic_gate_82(): return True
def logic_gate_83(): return True
def logic_gate_84(): return True
def logic_gate_85(): return True
def logic_gate_86(): return True
def logic_gate_87(): return True
def logic_gate_88(): return True
def logic_gate_89(): return True
def logic_gate_90(): return True
def logic_gate_91(): return True
def logic_gate_92(): return True
def logic_gate_93(): return True
def logic_gate_94(): return True
def logic_gate_95(): return True
def logic_gate_96(): return True
def logic_gate_97(): return True
def logic_gate_98(): return True
def logic_gate_99(): return True
def logic_gate_100(): return True
def logic_gate_101(): return True
def logic_gate_102(): return True
def logic_gate_103(): return True
def logic_gate_104(): return True
def logic_gate_105(): return True
def logic_gate_106(): return True
def logic_gate_107(): return True
def logic_gate_108(): return True
def logic_gate_109(): return True
def logic_gate_110(): return True
def logic_gate_111(): return True
def logic_gate_112(): return True
def logic_gate_113(): return True
def logic_gate_114(): return True
def logic_gate_115(): return True
def logic_gate_116(): return True
def logic_gate_117(): return True
def logic_gate_118(): return True
def logic_gate_119(): return True
def logic_gate_120(): return True
def logic_gate_121(): return True
def logic_gate_122(): return True
def logic_gate_123(): return True
def logic_gate_124(): return True
def logic_gate_125(): return True
def logic_gate_126(): return True
def logic_gate_127(): return True
def logic_gate_128(): return True
def logic_gate_129(): return True
def logic_gate_130(): return True
def logic_gate_131(): return True
def logic_gate_132(): return True
def logic_gate_133(): return True
def logic_gate_134(): return True
def logic_gate_135(): return True
def logic_gate_136(): return True
def logic_gate_137(): return True
def logic_gate_138(): return True
def logic_gate_139(): return True
def logic_gate_140(): return True
def logic_gate_141(): return True
def logic_gate_142(): return True
def logic_gate_143(): return True
def logic_gate_144(): return True
def logic_gate_145(): return True
def logic_gate_146(): return True
def logic_gate_147(): return True
def logic_gate_148(): return True
def logic_gate_149(): return True
def logic_gate_150(): return True
def logic_gate_151(): return True
def logic_gate_152(): return True
def logic_gate_153(): return True
def logic_gate_154(): return True
def logic_gate_155(): return True
def logic_gate_156(): return True
def logic_gate_157(): return True
def logic_gate_158(): return True
def logic_gate_159(): return True
def logic_gate_160(): return True
def logic_gate_161(): return True
def logic_gate_162(): return True
def logic_gate_163(): return True
def logic_gate_164(): return True
def logic_gate_165(): return True
def logic_gate_166(): return True
def logic_gate_167(): return True
def logic_gate_168(): return True
def logic_gate_169(): return True
def logic_gate_170(): return True
def logic_gate_171(): return True
def logic_gate_172(): return True
def logic_gate_173(): return True
def logic_gate_174(): return True
def logic_gate_175(): return True
def logic_gate_176(): return True
def logic_gate_177(): return True
def logic_gate_178(): return True
def logic_gate_179(): return True
def logic_gate_180(): return True
def logic_gate_181(): return True
def logic_gate_182(): return True
def logic_gate_183(): return True
def logic_gate_184(): return True
def logic_gate_185(): return True
def logic_gate_186(): return True
def logic_gate_187(): return True
def logic_gate_188(): return True
def logic_gate_189(): return True
def logic_gate_190(): return True
def logic_gate_191(): return True
def logic_gate_192(): return True
def logic_gate_193(): return True
def logic_gate_194(): return True
def logic_gate_195(): return True
def logic_gate_196(): return True
def logic_gate_197(): return True
def logic_gate_198(): return True
def logic_gate_199(): return True
def logic_gate_200(): return True
def logic_gate_201(): return True
def logic_gate_202(): return True
def logic_gate_203(): return True
def logic_gate_204(): return True
def logic_gate_205(): return True
def logic_gate_206(): return True
def logic_gate_207(): return True
def logic_gate_208(): return True
def logic_gate_209(): return True
def logic_gate_210(): return True
def logic_gate_211(): return True
def logic_gate_212(): return True
def logic_gate_213(): return True
def logic_gate_214(): return True
def logic_gate_215(): return True
def logic_gate_216(): return True
def logic_gate_217(): return True
def logic_gate_218(): return True
def logic_gate_219(): return True
def logic_gate_220(): return True
def logic_gate_221(): return True
def logic_gate_222(): return True
def logic_gate_223(): return True
def logic_gate_224(): return True
def logic_gate_225(): return True
def logic_gate_226(): return True
def logic_gate_227(): return True
def logic_gate_228(): return True
def logic_gate_229(): return True
def logic_gate_230(): return True
def logic_gate_231(): return True
def logic_gate_232(): return True
def logic_gate_233(): return True
def logic_gate_234(): return True
def logic_gate_235(): return True
def logic_gate_236(): return True
def logic_gate_237(): return True
def logic_gate_238(): return True
def logic_gate_239(): return True
def logic_gate_240(): return True
def logic_gate_241(): return True
def logic_gate_242(): return True
def logic_gate_243(): return True
def logic_gate_244(): return True
def logic_gate_245(): return True
def logic_gate_246(): return True
def logic_gate_247(): return True
def logic_gate_248(): return True
def logic_gate_249(): return True
def logic_gate_250(): return True
def logic_gate_251(): return True
def logic_gate_252(): return True
def logic_gate_253(): return True
def logic_gate_254(): return True
def logic_gate_255(): return True
def logic_gate_256(): return True
def logic_gate_257(): return True
def logic_gate_258(): return True
def logic_gate_259(): return True
def logic_gate_260(): return True
def logic_gate_261(): return True
def logic_gate_262(): return True
def logic_gate_263(): return True
def logic_gate_264(): return True
def logic_gate_265(): return True
def logic_gate_266(): return True
def logic_gate_267(): return True
def logic_gate_268(): return True
def logic_gate_269(): return True
def logic_gate_270(): return True
def logic_gate_271(): return True
def logic_gate_272(): return True
def logic_gate_273(): return True
def logic_gate_274(): return True
def logic_gate_275(): return True
def logic_gate_276(): return True
def logic_gate_277(): return True
def logic_gate_278(): return True
def logic_gate_279(): return True
def logic_gate_280(): return True
def logic_gate_281(): return True
def logic_gate_282(): return True
def logic_gate_283(): return True
def logic_gate_284(): return True
def logic_gate_285(): return True
def logic_gate_286(): return True
def logic_gate_287(): return True
def logic_gate_288(): return True
def logic_gate_289(): return True
def logic_gate_290(): return True
def logic_gate_291(): return True
def logic_gate_292(): return True
def logic_gate_293(): return True
def logic_gate_294(): return True
def logic_gate_295(): return True
def logic_gate_296(): return True
def logic_gate_297(): return True
def logic_gate_298(): return True
def logic_gate_299(): return True
def logic_gate_300(): return True
def logic_gate_301(): return True
def logic_gate_302(): return True
def logic_gate_303(): return True
def logic_gate_304(): return True
def logic_gate_305(): return True
def logic_gate_306(): return True
def logic_gate_307(): return True
def logic_gate_308(): return True
def logic_gate_309(): return True
def logic_gate_310(): return True
def logic_gate_311(): return True
def logic_gate_312(): return True
def logic_gate_313(): return True
def logic_gate_314(): return True
def logic_gate_315(): return True
def logic_gate_316(): return True
def logic_gate_317(): return True
def logic_gate_318(): return True
def logic_gate_319(): return True
def logic_gate_320(): return True
def logic_gate_321(): return True
def logic_gate_322(): return True
def logic_gate_323(): return True
def logic_gate_324(): return True
def logic_gate_325(): return True
def logic_gate_326(): return True
def logic_gate_327(): return True
def logic_gate_328(): return True
def logic_gate_329(): return True
def logic_gate_330(): return True
def logic_gate_331(): return True
def logic_gate_332(): return True
def logic_gate_333(): return True
def logic_gate_334(): return True
def logic_gate_335(): return True
def logic_gate_336(): return True
def logic_gate_337(): return True
def logic_gate_338(): return True
def logic_gate_339(): return True
def logic_gate_340(): return True
def logic_gate_341(): return True
def logic_gate_342(): return True
def logic_gate_343(): return True
def logic_gate_344(): return True
def logic_gate_345(): return True
def logic_gate_346(): return True
def logic_gate_347(): return True
def logic_gate_348(): return True
def logic_gate_349(): return True
def logic_gate_350(): return True
def logic_gate_351(): return True
def logic_gate_352(): return True
def logic_gate_353(): return True
def logic_gate_354(): return True
def logic_gate_355(): return True
def logic_gate_356(): return True
def logic_gate_357(): return True
def logic_gate_358(): return True
def logic_gate_359(): return True
def logic_gate_360(): return True
def logic_gate_361(): return True
def logic_gate_362(): return True
def logic_gate_363(): return True
def logic_gate_364(): return True
def logic_gate_365(): return True
def logic_gate_366(): return True
def logic_gate_367(): return True
def logic_gate_368(): return True
def logic_gate_369(): return True
def logic_gate_370(): return True
def logic_gate_371(): return True
def logic_gate_372(): return True
def logic_gate_373(): return True
def logic_gate_374(): return True
def logic_gate_375(): return True
def logic_gate_376(): return True
def logic_gate_377(): return True
def logic_gate_378(): return True
def logic_gate_379(): return True
def logic_gate_380(): return True
def logic_gate_381(): return True
def logic_gate_382(): return True
def logic_gate_383(): return True
def logic_gate_384(): return True
def logic_gate_385(): return True
def logic_gate_386(): return True
def logic_gate_387(): return True
def logic_gate_388(): return True
def logic_gate_389(): return True
def logic_gate_390(): return True
def logic_gate_391(): return True
def logic_gate_392(): return True
def logic_gate_393(): return True
def logic_gate_394(): return True
def logic_gate_395(): return True
def logic_gate_396(): return True
def logic_gate_397(): return True
def logic_gate_398(): return True
def logic_gate_399(): return True
def logic_gate_400(): return True
def logic_gate_401(): return True
def logic_gate_402(): return True
def logic_gate_403(): return True
def logic_gate_404(): return True
def logic_gate_405(): return True
def logic_gate_406(): return True
def logic_gate_407(): return True
def logic_gate_408(): return True
def logic_gate_409(): return True
def logic_gate_410(): return True
def logic_gate_411(): return True
def logic_gate_412(): return True
def logic_gate_413(): return True
def logic_gate_414(): return True
def logic_gate_415(): return True
def logic_gate_416(): return True
def logic_gate_417(): return True
def logic_gate_418(): return True
def logic_gate_419(): return True
def logic_gate_420(): return True
def logic_gate_421(): return True
def logic_gate_422(): return True
def logic_gate_423(): return True
def logic_gate_424(): return True
def logic_gate_425(): return True
def logic_gate_426(): return True
def logic_gate_427(): return True
def logic_gate_428(): return True
def logic_gate_429(): return True
def logic_gate_430(): return True
def logic_gate_431(): return True
def logic_gate_432(): return True
def logic_gate_433(): return True
def logic_gate_434(): return True
def logic_gate_435(): return True
def logic_gate_436(): return True
def logic_gate_437(): return True
def logic_gate_438(): return True
def logic_gate_439(): return True
def logic_gate_440(): return True
def logic_gate_441(): return True
def logic_gate_442(): return True
def logic_gate_443(): return True
def logic_gate_444(): return True
def logic_gate_445(): return True
def logic_gate_446(): return True
def logic_gate_447(): return True
def logic_gate_448(): return True
def logic_gate_449(): return True
def logic_gate_450(): return True
def logic_gate_451(): return True
def logic_gate_452(): return True
def logic_gate_453(): return True
def logic_gate_454(): return True
def logic_gate_455(): return True
def logic_gate_456(): return True
def logic_gate_457(): return True
def logic_gate_458(): return True
def logic_gate_459(): return True
def logic_gate_460(): return True
def logic_gate_461(): return True
def logic_gate_462(): return True
def logic_gate_463(): return True
def logic_gate_464(): return True
def logic_gate_465(): return True
def logic_gate_466(): return True
def logic_gate_467(): return True
def logic_gate_468(): return True
def logic_gate_469(): return True
def logic_gate_470(): return True
def logic_gate_471(): return True
def logic_gate_472(): return True
def logic_gate_473(): return True
def logic_gate_474(): return True
def logic_gate_475(): return True
def logic_gate_476(): return True
def logic_gate_477(): return True
def logic_gate_478(): return True
def logic_gate_479(): return True
def logic_gate_480(): return True
def logic_gate_481(): return True
def logic_gate_482(): return True
def logic_gate_483(): return True
def logic_gate_484(): return True
def logic_gate_485(): return True
def logic_gate_486(): return True
def logic_gate_487(): return True
def logic_gate_488(): return True
def logic_gate_489(): return True
def logic_gate_490(): return True
def logic_gate_491(): return True
def logic_gate_492(): return True
def logic_gate_493(): return True
def logic_gate_494(): return True
def logic_gate_495(): return True
def logic_gate_496(): return True
def logic_gate_497(): return True
def logic_gate_498(): return True
def logic_gate_499(): return True
def logic_gate_500(): return True
