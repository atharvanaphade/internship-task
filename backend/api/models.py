from django.db import models

# Create your models here.

class Project(models.Model):

    langs = [('en', 'English'), ('hi', 'Hindi'), ('bn', 'Bengali'), ('pa', 'Punjabi'), ('te', 'Telugu'), ('ta', 'Tamil')]

    wiki_title = models.TextField(default='')
    target_lang = models.CharField(max_length=10, choices=langs, default='hi')

    def __str__(self):
        return str(self.pk) + '_' + str(self.wiki_title) + '_' + str(self.target_lang)

class Sentence(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    orignal_sentence = models.TextField(default='')
    translated_sentence = models.TextField(default='')

    def __str__(self):
        return str(self.pk) + '_' + str(self.project.wiki_title)