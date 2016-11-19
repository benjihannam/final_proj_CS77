import javax.swing.*;
import java.awt.*;
import java.awt.Color;
import java.awt.image.BufferedImage;

/**
 * Created by benjihannam on 11/17/16.
 */
public class Graphics extends JPanel {

    private BufferedImage canvas;
    public ValueNoise noise;

    public Graphics(int width, int height) {
        noise  = new ValueNoise(width, height);
        canvas = new BufferedImage(width, height, BufferedImage.TYPE_INT_ARGB);
        fillCanvas(java.awt.Color.BLUE);
        for(int x = 0; x < canvas.getWidth(); x++){
            for(int y = 0; y < canvas.getHeight(); y++){
                drawNoise(x, y);
            }
        }
    }

    public Dimension getPreferredSize() {
        return new Dimension(canvas.getWidth(), canvas.getHeight());
    }

    public void paintComponent(java.awt.Graphics g) {
        super.paintComponent(g);
        Graphics2D g2 = (Graphics2D) g;
        g2.drawImage(canvas, null, null);

    }


    public void fillCanvas(Color c) {
        int color = c.getRGB();
        for (int x = 0; x < canvas.getWidth(); x++) {
            for (int y = 0; y < canvas.getHeight(); y++) {
                canvas.setRGB(x, y, Color.white.getRGB());
            }
        }
        repaint();
    }

    public void drawNoise(int x1, int y1) {

        //smooth noise
        //int col = (int)(255*noise.smoothNoise(x1/16, y1/16));

        //turbulance
        int col = (int)(noise.turbulance(x1, y1, 64));
        Color color = new Color((int)(noise.noise_values[x1][y1] *255), (int)(noise.noise_values[x1][y1] *255), (int)(noise.noise_values[x1][y1] *255));
        //Color color = new Color(col, col, col);
//        if(col < 70){
//            color = Color.blue;
//        }
//        else if(col < 80){
//            color = Color.cyan;
//        }
//        else if(col < 100){
//            color = Color.green;
//        }
//        else{
//            color = Color.orange;
//        }
        canvas.setRGB(x1, y1, color.getRGB());
        repaint();
    }



    public static void main(String[] args) {
        int width = 1056;
        int height = 520;
        JFrame frame = new JFrame("Value Noise Map");

        Graphics panel = new Graphics(width, height);

        frame.add(panel);
        frame.pack();
        frame.setVisible(true);
        frame.setResizable(false);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
    }

}