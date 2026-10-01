from django import forms
from .models import ContactMessage
class ContactForm(forms.ModelForm):
    class Meta:
        model=ContactMessage
        fields=['name','email','message']
        widgets={'name':forms.TextInput(attrs={'placeholder':'Your name','autocomplete':'name'}),'email':forms.EmailInput(attrs={'placeholder':'you@example.com','autocomplete':'email'}),'message':forms.Textarea(attrs={'placeholder':'Tell me about your idea...','rows':6})}
