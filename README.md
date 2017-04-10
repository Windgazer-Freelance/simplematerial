# SASS Tricks, Material Design

This should be a simplistic implementation of Material Design. I'm attempting to stay
close-ish to the [specs][1] defined by google. Although I'm not aiming for pixels, I've
never believed in pixels, instead I'm using (r)em's all the way, the base-font will
determine what eventual size you end up with.

I do try to adhere to the basic relative white-spacing / font-sizes that are in the
[specs][1] and I try to keep to the 'plain' coloring and minimalistic drop-shadows as much
as I can. In the end this is simply an attempt at making a quick-start styling framework
for my own html5 based projects.

## Requirements

Minimum requirements to use are essentially a way to install these files as a dependency
and some form of SASS :). For some detailed tips and tricks, check under the hood in my
`Gruntfile.js`.

- [SASS][2]
- [Sass-tricks][3] (Will tag along when installing as NPM dependency.)

## Development

If you want to hack on this code directly, [fork this repository on github][git] and make
sure you have the following installed:

- [SASS][2]
- [NPM][4]
- [Styledocco][5]

Then run:

```cli
npm install
```

For live-reload development making full use of the styledocco docs, combined with the
`examples.scss` file, run:

```cli
grunt host
```

and open 'http://localhost:8282/'

[1]: http://www.google.com/design/spec/material-design/introduction.html
[2]: http://sass-lang.com/
[3]: https://github.com/Windgazer-Freelance/sasstricks
[4]: https://www.npmjs.com/
[5]: https://github.com/jacobrask/styledocco

[git]: https://github.com/Windgazer-Freelance/simplematerial
