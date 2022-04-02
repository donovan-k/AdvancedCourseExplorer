from django.db import models
from django.contrib.contenttypes.models import ContentType


class Course(models.Model):
    course_id = models.IntegerField(db_column='course_id', primary_key=True)
    coursenumber = models.IntegerField(db_column='CourseNumber')  # Field name made lowercase.
    dept = models.CharField(db_column='Dept', max_length=30)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)  # Field name made lowercase.
    credits = models.IntegerField(db_column='Credits', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Course'
        unique_together = (('coursenumber', 'dept'),)


class Genedreq(models.Model):
    coursenumber = models.IntegerField(db_column='CourseNumber')  # Field name made lowercase.
    dept = models.CharField(db_column='Dept', max_length=30)  # Field name made lowercase.
    yearterm = models.CharField(db_column='YearTerm', max_length=255)  # Field name made lowercase.
    title = models.CharField(db_column='Title', max_length=255, blank=True, null=True)  # Field name made lowercase.
    acp = models.CharField(db_column='ACP', max_length=30, blank=True, null=True)  # Field name made lowercase.
    cs = models.CharField(db_column='CS', max_length=30, blank=True, null=True)  # Field name made lowercase.
    hum = models.CharField(db_column='HUM', max_length=30, blank=True, null=True)  # Field name made lowercase.
    nat = models.CharField(db_column='NAT', max_length=30, blank=True, null=True)  # Field name made lowercase.
    qr = models.CharField(db_column='QR', max_length=30, blank=True, null=True)  # Field name made lowercase.
    sbs = models.CharField(db_column='SBS', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'GenEdReq'
        unique_together = (('coursenumber', 'dept', 'yearterm'),)


class Professor(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=1000)  # Field name made lowercase.
    dept = models.CharField(db_column='Dept', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Professor'
        unique_together = (('id', 'name'),)


class Section(models.Model):
    sectionid = models.IntegerField(db_column='SectionID', primary_key=True)  # Field name made lowercase.
    professorid = models.ForeignKey(Professor, on_delete=models.CASCADE, db_column='ProfessorID', blank=True, null=True)  # Field name made lowercase.
    professors = models.CharField(db_column='Professors', max_length=1000, blank=True, null=True)  # Field name made lowercase.
    coursenumber = models.IntegerField(db_column='CourseNumber', blank=True, null=True)  # Field name made lowercase.
    dept = models.CharField(db_column='Dept', max_length=30, blank=True, null=True)  # Field name made lowercase.
    yearterm = models.CharField(db_column='YearTerm', max_length=255, blank=True, null=True)  # Field name made lowercase.
    avggpa = models.CharField(db_column='AvgGPA', max_length=30, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'Section'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey(ContentType, models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class UserInfo(models.Model):
    username = models.CharField(primary_key=True, max_length=100)
    password = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'course_exp_userinfo'


class UserInput(models.Model):
    id = models.PositiveIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    username = models.ForeignKey(UserInfo, on_delete=models.CASCADE)
    avg_gpa = models.DecimalField(max_digits=5, decimal_places=2)
    course_req = models.CharField(max_length=10)
    fav_professor = models.CharField(max_length=255)
    interests = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'course_exp_userinput'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(ContentType, models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'
        db_table = 'django_sessions'
