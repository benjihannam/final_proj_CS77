/**
 * Created by benjihannam on 11/16/16.
 * Based off of code from: http://lodev.org/cgtutor/randomnoise.html#Smooth_Noise_
 */

public class ValueNoise {
    public int width, height;
    public double[][] noise_values;

    public ValueNoise(int w, int h){
        width = w;
        height = h;
        noise_values  = new double[width][height];
        for(int x = 0; x < width; x++){
            for(int y = 0; y < height; y++){
                noise_values[x][y] = Math.random();
            }
        }
    }

    //replace with texture 2D(
    double smoothNoise(double x, double y)
    {
        int xi = (int)(Math.floor(x));
        int yi = (int)(Math.floor(y));
        //get fractional part of x and y
        double fractX = x - xi;
        double fractY = y - yi;

        //wrap around
        int x1 = (xi + width) % width;
        int y1 = (yi + height) % height;

        //neighbor values
        int x2 = (x1 + width - 1) % width;
        if(x2 < 0){
            x2 = width + x2;
        }
        int y2 = (y1 + height - 1) % height;
        if(y2 < 0){
            y2 = height + y2;
        }

        //smooth the noise with bilinear interpolation
        double value = 0.0;
        //bottom left weight
        value += fractX * fractY * noise_values[x1][y1];
        //bottom right weight
        value += (1 - fractX) * fractY * noise_values[x2][y1];
        //top left weight
        value += fractX * (1 - fractY) * noise_values[x1][y2];
        //top right weight
        value += (1 - fractX) * (1 - fractY) * noise_values[x2][y2];

        return value;
    }

    public double turbulance(double x, double y, int init_size){
        double value = 0.0, size = init_size;

        while(size >= 1){
            //add the value component for this size, scaled to represent
            value += smoothNoise(x/size, y/size) * size;
            size = size / 2;
        }

        return value;
    }


}
