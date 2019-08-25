import os
import shutil

from PyPDF2 import PdfFileReader, PdfFileWriter, PdfFileMerger
import csv

# /grades/${code}/${term}/${code}_${term}_${student_id}_${path_part}.pdf`;


def split(filePath, courseFolder, termFolder, gradeName, numPages=2):
    folder = f'{courseFolder}/{termFolder}'
    shutil.rmtree(f'{courseFolder}', ignore_errors=True)
    inputFile = open(filePath, "rb")
    os.mkdir(f'{courseFolder}')
    os.mkdir(folder)
    input1 = PdfFileReader(inputFile)
    with open("./data/activestudents.csv", "r") as read_file:
        data = csv.reader(read_file)
        line = 0
        for row in data:
            output = PdfFileWriter()
            for k in range(int(numPages)):
                output.addPage(input1.getPage(line+k))
            with open(f'{folder}/{courseFolder}_{termFolder}_{row[0]}_{gradeName}.pdf', "wb") as outputStream:
                output.write(outputStream)
            line += int(numPages)


""" output = PdfFileWriter()
    output.addPage(input1.getPage(i))
    merger.merge()
    with open("document-page%s.pdf" % i, "wb") as outputStream:
        output.write(outputStream)
with open("data_file.json", "r") as read_file:
    data = json.load(read_file)

    "ROmm0uk_Gq0AAAAAAABEN5soXtmhsqzgLVlJDa3TB_aRQpC5bO7cLuUxdr7TkYjR"
 """
