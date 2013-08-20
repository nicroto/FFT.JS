### What is FFT.JS?
Implementation for the Fast Fourier Transformation.
### How to use it?
You can use the tests.js to play with:
 ```javascript
 var N = 8,
 	 fft = new FFT(N);

 var re = new Array(N),
	 im = new Array(N);

 // Impulse
 re[0] = 1; im[0] = 0;
 for(var i = 1; i < N; i++)
   re[i] = im[i] = 0;
 fft.fft(re, im);
 // the two arrays are now holding the transformed values
 // ...

 // Nyquist
 for(var i = 0; i < N; i++) {
   re[i] = Math.pow(-1, i);
   im[i] = 0;
 }
 fft.fft(re, im);
 // the two arrays are now holding the transformed values
 // ...

 // Single sin
 for(var i = 0; i < N; i++) {
   re[i] = Math.cos(2*Math.PI*i / N);
   im[i] = 0;
 }
 fft.fft(re, im);
 // the two arrays are now holding the transformed values
 // ...
 ```
### Credits
This code is ported from Java and here is the original source [here](http://www.ee.columbia.edu/~ronw/code/MEAPsoft/doc/html/FFT_8java-source.html).