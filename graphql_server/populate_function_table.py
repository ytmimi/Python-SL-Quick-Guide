import os
os.environ.setdefault('DJANGO_SETTINGS_MODULE','standard_library.settings')

import django
django.setup()

from functions.models import Function

#list of function found at: https://docs.python.org/3.6/library/functions.html
function_lst = [
'abs', 'delattr', 'hash', 'memoryview', 'set',
'all', 'dict', 'help', 'min', 'setattr',
'any', 'dir', 'hex', 'next', 'slice',
'ascii', 'divmod', 'id', 'object',	'sorted',
'bin', 'enumerate',	'input', 'oct',	'staticmethod',
'bool',	'eval',	'int', 'open', 'str',
'breakpoint', 'exec', 'isinstance',	'ord', 'sum',
'bytearray', 'filter',	'issubclass', 'pow', 'super',
'bytes', 'float', 'iter',	'print', 'tuple',
'callable',	'format', 'len', 'property', 'type',
'chr', 'frozenset',	'list',	'range', 'vars',
'classmethod', 'getattr', 'locals', 'repr', 'zip',
'compile', 'globals', 'map', 'reversed', '__import__',
'complex', 'hasattr', 'max', 'round',
]

for name in function_lst:
    f, created = Function.objects.get_or_create(name = name)

    f.description = 'Add a description for this function.'
    f.code_example ='#Add a code snippet for this function.'
    f.save()
