from django.db import models


# UserInfo model
class UserInfo(models.Model):
    username = models.CharField(max_length=100, primary_key=True)
    password = models.CharField(max_length=100)


# UserInput model
class UserInput(models.Model):
    ID = models.PositiveIntegerField(primary_key=True)
    username = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    interests = models.CharField(max_length=255, default='0.0.0000986320.8956230.9856230.8456230.22288888')
    fav_professor = models.CharField(max_length=255, default='')
    avg_gpa = models.DecimalField(decimal_places=2, max_digits=5, default=-1)
    course_req = models.CharField(max_length=10, default='')


# Course model
class Course(models.Model):
    course_number = models.PositiveIntegerField()
    dept = models.CharField(max_length=10)
    description = models.CharField(max_length=500)
    credits = models.PositiveIntegerField()

    class Meta:
        unique_together = (('course_number', 'dept'),)


# Professor model
class Professor(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    names = models.CharField(max_length=100)
    dept = models.CharField(max_length=10)


# GenEdReq model
class GenEdReq(models.Model):
    course_number = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='gen_course_n')
    dept = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='gen_dept')
    year_term = models.CharField(max_length=50)
    title = models.CharField(max_length=255)
    acp = models.CharField(max_length=30)
    cs = models.CharField(max_length=30)
    hum = models.CharField(max_length=30)
    nat = models.CharField(max_length=30)
    sbs = models.CharField(max_length=30)


# SectionInfo model
class Section(models.Model):
    section_id = models.PositiveIntegerField(primary_key=True)
    professor_id = models.ForeignKey(Professor, on_delete=models.CASCADE)
    professors = models.CharField(max_length=500)
    course_number = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='section_course_n')
    dept = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='section_dept')
    year_term = models.ForeignKey(GenEdReq, on_delete=models.CASCADE)
    avg_gpa = models.DecimalField(decimal_places=2, max_digits=5, default=-1)

    class Meta:
        unique_together = (('course_number', 'dept'),)
