from django.contrib import messages
from django.shortcuts import redirect, render
from .forms import ContactForm
def home(request):
    if request.method=='POST':
        form=ContactForm(request.POST)
        if form.is_valid():
            form.save(); messages.success(request,'Your message was received. I will get back to you soon.'); return redirect('/#contact')
    else: form=ContactForm()
    return render(request,'portfolio/home.html',{'form':form})
