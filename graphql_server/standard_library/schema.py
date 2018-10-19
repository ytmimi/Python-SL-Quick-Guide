import graphene
from functions.schema import Query as function_query
from functions.schema import Mutation as function_mutation



class Query(function_query, graphene.ObjectType):
    pass


class Mutation(function_mutation, graphene.ObjectType):
    pass



schema = graphene.Schema(query=Query, mutation=Mutation)
