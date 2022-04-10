from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets, views
from rest_framework.response import Response
from django.db import connection
from .serializers import CourseSerializer, GenedreqSerializer, ProfessorSerializer,  SectionSerializer, \
    UserInfoSerializer, UserInputSerializer
from .models import Course, Genedreq, Professor, Section, UserInfo, UserInput
from rest_framework.authentication import SessionAuthentication, TokenAuthentication


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        return  # To not perform the csrf check previously happening


# Create your views here.
class CourseView(viewsets.ModelViewSet):
    serializer_class = CourseSerializer

    # used to query the data set back using the query parameters
    def get_queryset(self):
        contains_term = self.request.query_params['containsTerm']
        print(contains_term)
        contains_list = str(contains_term).split(';')

        return self.filter_contains(contains_list)

    # since each interest is separated by a semicolon, we have to filter multiple times
    def filter_contains(self, contain_list):
        course = Course.objects
        for term in contain_list:
            course = course.filter(description__contains=term)

        return course


class AdvancedQuery1View(views.APIView):

    def get(self, request):
        query = """
                SELECT p.id, p.name, p.dept, count(p.id)
                FROM Course c NATURAL JOIN Section s Join Professor p ON (p.id = s.professorid)
                WHERE c.credits = 3 AND c.dept != 'CS' AND s.avggpa >= 3.5
                GROUP BY s.professorid
                ORDER BY p.id
                """
        with connection.cursor() as cursor:
            cursor.execute(query)
            cursor.fetchone()
            json_data = dictfetchall(cursor)
            return JsonResponse(json_data, safe=False)


class AdvancedQuery2View(views.APIView):
    def get(self, request):

        query = """
        SELECT g.title, g.dept, count(s.sectionid)
        FROM Course c NATURAL JOIN GenEdReq g JOIN Section s ON (c.coursenumber = s.coursenumber AND c.dept = s.dept)
        WHERE g.cs = 'US' AND s.avggpa >= 3.5
        GROUP BY g.coursenumber, g.dept
        ORDER BY g.dept
        """
        with connection.cursor() as cursor:
            cursor.execute(query)
            cursor.fetchone()
            json_data = dictfetchall(cursor)
            return JsonResponse(json_data, safe=False)


def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

    
class GenedreqView(viewsets.ModelViewSet):
    serializer_class = GenedreqSerializer
    queryset = Genedreq.objects.all()


class ProfessorView(viewsets.ModelViewSet):
    serializer_class = ProfessorSerializer
    queryset = Professor.objects.all()


class SectionView(viewsets.ModelViewSet):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()


class UserInfoView(viewsets.ModelViewSet):
    serializer_class = UserInfoSerializer
    queryset = UserInfo.objects.all()
    authentication_classes = (CsrfExemptSessionAuthentication, TokenAuthentication)


class UserInputView(viewsets.ModelViewSet):
    serializer_class = UserInputSerializer
    queryset = UserInput.objects.all()
    authentication_classes = (CsrfExemptSessionAuthentication, TokenAuthentication)
