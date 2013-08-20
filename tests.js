// TEST HELPERS
var helpers = {
  beforeAfter: function (fft, re, im) {
    var self = this;
    console.log("Before: ");
    self.printReIm(re, im);
    fft.fft(re, im);
    console.log("After: ");
    self.printReIm(re, im);
  },

  printReIm: function (re, im) {
    var output = [];
    var line = [];
    for(var i = 0; i < re.length; i++)
      line.push(parseFloat(((re[i]*1000)/1000).toFixed(3)) + "");
    output.push("Re: [" + line.join(" ") + "]");

    line = [];
    for(var i = 0; i < im.length; i++)
      line.push(parseFloat(((im[i]*1000)/1000).toFixed(3))+ "");
    output.push("Im: [" + line.join(" ") + "]");
    console.log(output.join("\n"));
  }
};

// TESTS
var N = 8;

var fft = new FFT(N);

var re = new Array(N);
var im = new Array(N);

// Impulse
re[0] = 1; im[0] = 0;
for(var i = 1; i < N; i++)
  re[i] = im[i] = 0;
helpers.beforeAfter(fft, re, im);

// Nyquist
for(var i = 0; i < N; i++) {
  re[i] = Math.pow(-1, i);
  im[i] = 0;
}
helpers.beforeAfter(fft, re, im);

// Single sin
for(var i = 0; i < N; i++) {
  re[i] = Math.cos(2*Math.PI*i / N);
  im[i] = 0;
}
helpers.beforeAfter(fft, re, im);

// Ramp
for(var i = 0; i < N; i++) {
  re[i] = i;
  im[i] = 0;
}
helpers.beforeAfter(fft, re, im);

var time = new Date();
var iter = 30000;
for(var i = 0; i < iter; i++)
  fft.fft(re,im);
time = (new Date()) - time;
console.log("Averaged " + (time/iter) + "ms per iteration");

/* Expected results (read in console)
  Before: 
  Re: [1 0 0 0 0 0 0 0]
  Im: [0 0 0 0 0 0 0 0]
  After: 
  Re: [1 1 1 1 1 1 1 1]
  Im: [0 0 0 0 0 0 0 0]
  Before: 
  Re: [1 -1 1 -1 1 -1 1 -1]
  Im: [0 0 0 0 0 0 0 0]
  After: 
  Re: [0 0 0 0 8 0 0 0]
  Im: [0 0 0 0 0 0 0 0]
  Before: 
  Re: [1 0.707 0 -0.707 -1 -0.707 0 0.707]
  Im: [0 0 0 0 0 0 0 0]
  After: 
  Re: [0 4 0 0 0 0 0 4]
  Im: [0 0 0 0 0 0 0 0]
  Before: 
  Re: [0 1 2 3 4 5 6 7]
  Im: [0 0 0 0 0 0 0 0]
  After: 
  Re: [28 -4 -4 -4 -4 -4 -4 -4]
  Im: [0 9.657 4 1.657 0 -1.657 -4 -9.657]
*/