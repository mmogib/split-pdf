import os
import sys
from math import ceil
import shutil


from PyPDF2 import PdfFileReader, PdfFileWriter, PdfFileMerger
import csv


def split(src, dist,  names, numPages):
    page = 0
    for name in names:
        output = PdfFileWriter()
        for k in range(numPages):
            output.addPage(src.getPage(page+k))
        with open(f'{dist}/{name}', "wb") as outputStream:
            output.write(outputStream)
        page += numPages


if len(sys.argv) < 5:
    raise Exception('Missing arguments.. ')

src = sys.argv[1]
dist = sys.argv[2]
numPages = int(sys.argv[3])
namesCSV = sys.argv[4]


inputFile = open(src, "rb")
inputPdf = PdfFileReader(inputFile)
total = inputPdf.getNumPages()
numOfDocs = total / numPages

if numOfDocs != ceil(numOfDocs):
    raise Exception(
        f'Number of pages in the pdf file ({total}) is not divisible by {numPages}.')

names = []
if namesCSV != "":
    with open(namesCSV, 'r') as read_file:
        data = csv.reader(read_file)
        for row in data:
            names.append(f'{row[0]}.pdf')
else:
    counter = 1
    for doc in range(0, total, numPages):
        names.append(f'document_{counter}.pdf')
        counter += 1

if len(names) != numOfDocs:
    raise Exception(
        f'The number of names {len(names)} is not equal to the number of documents extracted ({int(numOfDocs)}).')


split(inputPdf, dist,  names, numPages)
print("...")
