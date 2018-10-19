import graphene
from graphene_django.types import DjangoObjectType
from functions.models import Function
from graphql import GraphQLError

class FunctionType(DjangoObjectType):
    class Meta:
        model = Function

class UpdateFunction(graphene.Mutation):
    #define the return type of the mutation
    #if you want to output a single graphen ObjectType, you can specify that
    #by using the Output attribute
    Output = FunctionType
    class Arguments:
        # defines the arguments for the function
        name = graphene.String(required=True)
        description = graphene.String(required=False)
        code_example = graphene.String(required=False)

    def mutate(self, info, name, description=None, code_example=None):
        try:
            function = Function.objects.get(name=name)
            if description:
                function.description = description
            if code_example:
                function.code_example = code_example
            function.save()
            return function
        except Function.DoesNotExist as e:
            raise GraphQLError(f'function {name} does not exist.')


class Query(object):
    functions = graphene.List(FunctionType)
    function = graphene.Field(
        FunctionType,
        name=graphene.String(required=True)
    )

    def resolve_functions(self, info, **kwargs):
        return Function.objects.all().order_by('name')

    def resolve_function(self, info, name, **kwargs):
        return Function.objects.get(name=name)


class Mutation(object):
    # slightly different naming convention for fields
    update_function = UpdateFunction.Field()
