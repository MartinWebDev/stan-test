# Running the app

Fire up mini server, just a crappy basic express server to spit out the show data. No error handling, nothing fancy,
but it will randomly delay the response to simulate different load times, and will randomly throw an error to simulate error handling on the frontend.

```
npm run server
```

Run the app itself

```
npm run start
```

Webpack config is pretty basic, just setup in a way that will spit out the required files for this test's brief.

# You should avoid using any other JS/CSS frameworks/libraries.

I feel I must professionally disagree. If plenty of round wheels exist, why create a square one?\
To this end, rather than re-writing some popular functionality I have chosen to use the following things and my reasoning why.

1. `usehook-ts` - Used to cut out unneccesary coding time for certain functionality. For example, we can make use of the useEventListener for detecting our keypres events.
1. `express` - Kind of required in a way, since the test required using the fetch api. Could use an online service, but a local server for this data is simple enough to just include it here and that also allows for more control over how the data is queried and returned.

# Overview of process

Firstly, apologies in advance for the comment spam throughout this code. My usual approach to such projects is to explain various things in context of where those things are. It makes reading through rationale somewhat easier as the reader need not continously flick back and forth between code and readmes as this is an easy way to get overwhelmed and/or lost. In reality, I try to keep comments only to what is essential to communicate to other developers about what things are doing in general and write the code is such a way that it isn't confusing enough to need loads of comments. Typically I see comments as a developer needing to explain what is going on because their code is confusing or badly written, whereas they should be more abstract and high level to explain maybe a whole block of code quickly for when another developer is looking for something specific. In the context of these tests however, this is different since the reader's specific reason for reading all the code is to understand the original developers thinking, not the code itself.

Went for a "mobile first" style approach but with a twist. Since the requirements are to make it work across a 720p screen and a 1080p screen I considered the 720 screen to be my "mobile first" view and the 1080p screen to be the "desktop" view. This ensures that things will always display nicely on those smaller screens and then anything bigger will just see more, or larger items, or whatever else.

Started by putting together the basic layout with a few "component" assumptions that made themselves obvious from the beginning. Also included a basic context system for storing the returned API data since this was an obvious requirement based on the specs provided.

# Assumptions/Decisions

- Colours were taken from the provided screenshots using a colour picker extension for Chrome. Should be fairly accurate but easily room for discrepencies with this method. Real projects would obviously have colours provided in the designs, but for now this worked pretty well to copy the designs provided.
- Target device will only ever be TVs for this project. If it were to be ported over to other devices, the use of min-height in the media queries could cause some weird issues with random widths in between and especially with portait view. So for the sake of this project, we assume it will _only_ ever be on TVs. Known dimensions and always landscape view.
- Assumed the designs provided are the expected "720p" view. This means I won't need to try and cramp everything up when doing the 1080. If I considered the design to be the 720, it would be on me to shrink everything up and make it fit nicely.
- Sizes of things are definitely guesses, just a visual comparison between what I worked on and the screenshots until they look about right. As with colours, for real projects, these dimensions would be provided, so this is fine for now.
- There was no requirement to make the filters at the top of the page actually work, so I didn't. Just made them look visually good for now. Given that the whole array of data is grabbed at once, adding such functionality would not be complex anyway. Just throw a simple javascript array filter function over the array where it is used. Or for use across multiple views, have the filter function be stored in the context and filter from that point.
- There was no specified method as to how the carousel would scroll, so I had to choose my own. I referenced my own TV to see how apps on there approached it. The ones I looked at all used a scroll method where the selected item is always the left most item on screen, except until the end of the list when the selection border itself would move. This part of the method is somewhat shown in the screenshot provided, but nothing specifying how it would scroll once the user reaches the right most item visible on screen, or whether the user would move to around the center, focus there until the end of the list, then move to the right. So I decided ultimately to go with a paginated view, this keeps the same type of scrolling as the app on my TV but also the selection highlight as requested in the design image.
- Some of the css problems, like maintaining the same left/right padding values on the home screen, could be solved using a global variables file in styled-components, a library which was permitted by the requirements. But lately I've been trying to use less css-in-js solutions and more actual css as css is meant to be.
- The show page shows the text "1 season", but the data does not include any reference to the count of seasons for series shows. Assumed this to simply be an oversight and for this project I have added a new property for count of seasons where the type in "season". Currently they are all just 1 anyway, but the point is to show how the frontend would deal with it. This property is absent for types of "movie", this is deliberate.

# Things I'd change or things for future consideration

- In this app, css class names were carefully named to avoid conflicts. This is fine on a project so small, but ideally we'd want at least a basic module system setup so css classes are named on a component/module level basis and conflicts are therefore impossible.
- Some sort of auto-refetch of the data after maybe a time limit, or after a certain number of navigations, etc. So if any new data became available while the user is browsing, that new data would eventually be available.
- Better still, a proper api library would give us caching functionality, this could be used instead to automatically refetch the data whenever the local cache expires. Could implement a simple version with localStorage too, but given the small amount of data here, context works great, and is easily extended to include some sort of caching/storage if needs be in the future.
- Some kind of css library would be nice, so as to make use of mixins, variables (outside of standard css variables), etc, but that would be a) additional work that would delay this mini project, and b) an additional library which was requested not to be used. Perhaps PostCSS, but honestly my view on that is that it should be renamed "Magic Strings: The Library", so maybe just sass as a minimum. (See note in assumptions/decisions above)
- There is a lot of essentially repeated css here. Not _actual_ css, but values, and multiples of values. Given a real app there would usually be a style guide with a predefined standard gap and then multiples thereof. This would then sit nicely with a good css library instead of having "64px" and "128px" everywhere. But given there is no style guide or even a mockup to get such values from and everything in this app has been measured solely through guess work, it was the simplest approach to take. Were such designs provided the approach taken would have certainly been different.
