FROM python:slim

COPY ./requirements.txt .
RUN pip install -r ./requirements.txt

CMD ["python", "./run.py"]
