# Generated by Django 3.0.7 on 2020-06-19 23:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("todo_lists", "0002_todo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="todo", name="deadline", field=models.DateTimeField(),
        ),
    ]
