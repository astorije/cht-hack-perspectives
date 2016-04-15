# Can we make building perspectives fun?

This is a 1-day project [Matthew “Lasercat” Saunders](https://github.com/msaun008) and I developed on Thursday 14 April 2016, during [CloudHealth's 4th Hackathon](https://twitter.com/search?q=%23CHThack).

## Features

Simply put, [CloudHealth perspectives](https://www.cloudhealthtech.com/technology/perspectives), or functional business groups, are a way to categorize infrastructure assets.

This project was an attempt to make creating and editing perspectives intuitive by replacing complex menu actions and numerous clicks in different tabs with a simple, user-friendly, drag-and-droppable interface.

After generating random and fake data of 500 AWS EC2 instances, it lets the user:

- See all asset colored by their status (active / inactive)
- Access details of an asset by hovering or clicking on it
- Drag and drop assets across groups
- Create new groups by dropping assets into a shadow group
- Categorize unallocated assets based on their:
  - Function
  - Instance Type
  - Zone Name
  - State
  - Active / Inactive
  - Owner
- Rename groups
- Delete groups, sending their assets back to the unallocated assets

## Try it out

See the magic happen in your very browser [at this online demo](https://astorije.github.io/cht-hack-perspectives/dist/).

## Install and run locally

Clone this repository and run:

```sh
npm install
npm start
```

Open <http://localhost:8080/>. The app will be reloaded at every change.

## Update the demo

Bundle the scripts using:

```sh
npm run build
git commit -m 'Update bundled scripts' dist/bundle.js
git push
```

## Libraries and tools used

- [React](https://facebook.github.io/react/)
- [React-DnD](https://gaearon.github.io/react-dnd/)
- [Redux](http://redux.js.org/)
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [ECMAScript 6](http://es6-features.org/)
- [Babel](https://babeljs.io/)
- [Webpack](https://webpack.github.io/)
- [Font Awesome](https://fortawesome.github.io/Font-Awesome/)
- [Primer](http://primercss.io/)

## Resources

- http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html#getting-data-in-from-redux-to-react
- https://gaearon.github.io/react-dnd/docs-tutorial.html
- https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- http://dev.topheman.com/make-your-react-production-minified-version-with-webpack/
