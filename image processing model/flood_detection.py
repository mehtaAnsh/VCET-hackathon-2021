from tkinter import filedialog
from PIL.Image import Image
import cv2 as cv
import numpy as np
from matplotlib import pyplot as plt
from matplotlib.image import imsave
from numpy.core.fromnumeric import size

def gray(img):
    gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)
    ret, thresh = cv.threshold(gray, 0, 255, cv.THRESH_BINARY+cv.THRESH_OTSU)
    thresh = cv.resize(thresh,(1000,650))
    return thresh
def pexels(img):
    countw = np.sum(img == 255)  #===>White pexels
    countb = np.sum(img == 0)    #===>Black pexels
    total_img=countw+countb     #===>Total pexels
    print("Total_IMG",total_img)
    print("White: ",countw)
    print("Black: ",countb)
    
# Selecting First Image That Should be Before Flood Images
path = filedialog.askopenfilename(filetypes=[("Image File", ".jpg"),("Image File", ".jpeg"),("Image File", ".png")])
img = cv.imread(path)
# Selecting Second Image That Should be After Flood Images
path1 = filedialog.askopenfilename(filetypes=[("Image File", ".jpg"),("Image File", ".jpeg"),("Image File", ".png")])
img1 = cv.imread(path1)
#Comparesion of images
thresh1=gray(img)
thresh2=gray(img1)
if thresh1.shape == thresh2.shape:
    difference = cv.subtract(thresh1,thresh2)
#Function call ==> for Pexels
print("First Image")
pexels(thresh1)
print("Second Image")
pexels(thresh2)
print("Difference Image")
pexels(difference)
#Output
plt.figure("OTSU")
plt.imshow(thresh1, cmap="gray")
plt.figure("OTSU1")
plt.imshow(thresh2, cmap="gray")
plt.figure("Difference")
plt.imshow(difference, cmap="gray")
plt.show()