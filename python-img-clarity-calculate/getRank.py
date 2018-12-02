#-*- coding:utf-8 -*-

# https://github.com/bob-chen/demos/tree/master/python-img-clarity-calculate

import sys


import os
import getopt
import cv2
import json

helpStr = """
usege: 
	--imgs=pathto/xx.jpg,pathto/xxx.png
	or
	-i pathto/xx.jpg,pathto/xxx.png

eg: 
	python getRank.py --imgs=./1.jpg,./2.jpg
"""

def log(s, isDebug=True):
	if isDebug:
		print s

def getImgName(url):
	tmp = url.split("/")
	return tmp[-1]

def getImageVar(imgPath):
	image = cv2.imread(imgPath);
	img2gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	imageVar = cv2.Laplacian(img2gray, cv2.CV_64F).var()

	return imageVar

def main(argv):
	try:
		opts, args = getopt.getopt(argv, "hi:", ["help", "imgs="])
	except Exception, ex:
		print ex
		sys.exit(2)

	jsonDict = {}

	for cmd, arg in opts:
		if cmd in ("-h", "--help"):
			print helpStr
			sys.exit()
		elif cmd in ("-i", "--imgs"):
			imgStr = arg
			imgList = imgStr.split(",")

			for img in imgList:
				if os.path.exists(img) :
					name = getImgName(img)
					rank = getImageVar(img)
					jsonDict[name] = rank

			print json.dumps(jsonDict)



if __name__ == "__main__":
	main(sys.argv[1:])
