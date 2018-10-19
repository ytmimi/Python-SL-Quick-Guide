from django.db import models

# Create your models here.
class Function(models.Model):
    name = models.CharField(max_length=30, primary_key=True)
    description = models.TextField(
        help_text='Explanation of how to use the function',
        default='Add a description for this function.',
    )
    code_example = models.TextField(
        default='#Add a code snippet for this function.',
    )

    def __str__(self):
        return self.name
