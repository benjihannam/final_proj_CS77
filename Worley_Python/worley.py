from cs1lib import *
from math import *
from random import randint, random

class Worley:
    def __init__(self, lamb, max_x, max_y, units, radius):
        self.lamb = lamb
        self.radius = radius
        self.max_x = max_x
        self.max_y = max_y
        self.m_values = []
        h = 541*max_x + 79*max_y % (pow(2,32))
        self.HashMap = [None] * int(h)
        self.units = units
        self.unit_list = []
        self.features = [None] * units
        for i in range(units):
            self.features[i] = [None] * units
            for j in range(units):
                self.features[i][j] = []
        self.ends = [None] * units
        for k in range(units):
            self.ends[k] = [None] * units
            for l in range(units):
                self.ends[k][l] = []

    def hash(self, x, y, value):
        h = 541*x + 79*y % (pow(2,32))
        self.HashMap[int(h)] = value

    def set_upm(self):
        prob = [None] * 15
        total = 0
        smallest = 1
        for i in range(7, 15):
            probability = 1/(pow(self.lamb, -i) * exp(self.lamb) * factorial(i))
            prob[i] = probability
            total += probability
            if (probability <= smallest):
                smallest = probability
        for m in range(7, 15):
            count = int(prob[m]/smallest)
            for i in range(count):
                self.m_values.append(m)

    def get_m_val(self, x, y):
        h = 541*x + 79*y % (pow(2,32))
        return self.HashMap[int(h)]

    def to_xyzz(self):
        for i in range(len(self.features)):
            for j in range(len(self.features[i])):
                for k in range(len(self.features[i][j])):
                    (p, theta) = self.features[i][j][k]
                    x = self.radius * sin(p) * cos(theta)
                    y = self.radius * sin(p) * sin(theta)
                    z = self.radius * cos(p)
                    self.ends[i][j].append(x)
                    self.ends[i][j].append(y)
                    self.ends[i][j].append(z)

    def set_up_units(self):
        for n in range(self.units):
            x = self.max_x * n/self.units
            for m in range(self.units):
                y = self.max_y * m/self.units
                r = randint(0, len(self.m_values) - 1)
                self.hash(int(x), int(y), int(self.m_values[r]))
                for f in range(int(self.m_values[r])):
                    rx = random()
                    ry = random()
                    self.features[n][m].append((x + rx*self.max_x/self.units, y + ry*self.max_y/self.units))


def insertionSort(alist):
    for index in range(1,len(alist)):
        (f, currentvalue) = alist[index]
        position = index
        (f2, comp) = alist[position-1]
        while position>0 and comp>currentvalue:
            alist[position]=alist[position-1]
            position = position-1
            (f2, comp) = alist[position-1]

        alist[position]=(f,currentvalue)

def distance(x, y, x2, y2):
    return sqrt((x2 - x)*(x2 - x) + (y2 - y)*(y2-y))

# WIDTH = 180
# HEIGHT = 360
# UNITS = 5
def main():
    curr = Worley(5, float(WIDTH), float(HEIGHT), UNITS)
    curr.set_upm()
    curr.set_up_units()
    curr_ix = 1
    x_n = float(WIDTH) / float(UNITS)
    y_n = float(HEIGHT) / float(UNITS)
    biggest_dist = sqrt(x_n*x_n + y_n*y_n)
    print(biggest_dist)
    #while not window_closed():
    for i in range(WIDTH):
        if i > curr_ix * x_n:
            curr_ix += 1
        curr_iy = 1
        for j in range(HEIGHT):
            if j > curr_iy * y_n:
                curr_iy += 1
            curr_box = curr.features[curr_ix-1][curr_iy-1]
            dist_list = []
            for p in curr_box:
                (x, y) = p
                d = distance(i, j, x, y)
                dist_list.append((p, d))
            if curr_ix > 1:
                for ap in curr.features[curr_ix-2][curr_iy-1]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_ix < UNITS:
                for ap in curr.features[curr_ix][curr_iy-1]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_iy > 1:
                for ap in curr.features[curr_ix-1][curr_iy-2]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_iy < UNITS:
                for ap in curr.features[curr_ix-1][curr_iy]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_ix > 1 and curr_iy < UNITS:
                for ap in curr.features[curr_ix-2][curr_iy]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_ix > 1 and curr_iy > 1:
                for ap in curr.features[curr_ix-2][curr_iy-2]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_ix < UNITS and curr_iy > 1:
                for ap in curr.features[curr_ix][curr_iy-2]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))
            if curr_ix < UNITS and curr_iy < UNITS:
                for ap in curr.features[curr_ix][curr_iy]:
                    (x, y) = ap
                    d = distance(i, j, x, y)
                    dist_list.append((ap, d))

            insertionSort(dist_list)
            (fp, dist) = dist_list[0]
            #print(dist_list)
            #print(dist)
            set_stroke_color((dist/biggest_dist), 0, 0)
            #set_fill_color(1,1,1)
            draw_point(i, j)

        #request_redraw()





# start_graphics(main, "test", 500, 500)
WIDTH = 180
HEIGHT = 360
UNITS = 5
curr = Worley(8, float(WIDTH), float(HEIGHT), UNITS, 1.2)
curr.set_upm()
curr.set_up_units()
curr.to_xyzz()


print curr.ends[0][0]
print len(curr.ends[0][0])/3
print curr.ends[0][1]
print len(curr.ends[0][1])/3
print curr.ends[0][2]
print len(curr.ends[0][2])/3
print curr.ends[0][3]
print len(curr.ends[0][3])/3
print curr.ends[0][4]
print len(curr.ends[0][4])/3
print curr.ends[1][0]
print len(curr.ends[1][0])/3
print curr.ends[1][1]
print len(curr.ends[1][1])/3
print curr.ends[1][2]
print len(curr.ends[1][2])/3
print curr.ends[1][3]
print len(curr.ends[1][3])/3
print curr.ends[1][4]
print len(curr.ends[1][4])/3
print curr.ends[2][0]
print len(curr.ends[2][0])/3
print curr.ends[2][1]
print len(curr.ends[2][1])/3
print curr.ends[2][2]
print len(curr.ends[2][2])/3
print curr.ends[2][3]
print len(curr.ends[2][3])/3
print curr.ends[2][4]
print len(curr.ends[2][4])/3
print curr.ends[3][0]
print len(curr.ends[3][0])/3
print curr.ends[3][1]
print len(curr.ends[3][1])/3
print curr.ends[3][2]
print len(curr.ends[3][2])/3
print curr.ends[3][3]
print len(curr.ends[3][3])/3
print curr.ends[3][4]
print len(curr.ends[3][4])/3
print curr.ends[4][0]
print len(curr.ends[4][0])/3
print curr.ends[4][1]
print len(curr.ends[4][1])/3
print curr.ends[4][2]
print len(curr.ends[4][2])/3
print curr.ends[4][3]
print len(curr.ends[4][3])/3
print curr.ends[4][4]
print len(curr.ends[4][4])/3
