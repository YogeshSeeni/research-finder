## Inspiration
What's more adventurous than the spirit of scientific inquiry? Unfortunately, academia lacks centralization, which often makes communication that facilitates discovery difficult.
There is no platform to facilitate collaboration between academics around the world, making it both difficult for students to locate research opportunities and for professors to find collaborators. As soon-to-be college students, we experienced this issue first-hand, as we found it difficult to break into the research field due to the lack of a communication medium. We thus decided to create Research Finder, a program designed to streamline communication between scholars across the globe.
## What it does
Research Finder is a website that allows researchers to post projects for students to find. It does this through a dedicated page where researchers can fill out information about the project they want to post, which will then be shared with fellow researchers and students. Students will then be able to apply to that projects page, which then notifies the researcher that posted it through email. The researcher and student would then be able to interact through the built-in chat in our website or through email for further discussion about the project.
## How we built it
We built a REST API with flask, which allowed our React JS + Bulma CSS frontend to easily perform CRUD operations on our Firebase Realtime Database. Firebase was also used to facilitate authentication, allowing us to manage users and send verification emails. Additionally, the Imgur API handled profile picture uploading, and SMTP was employed for email interaction.
## Challenges we ran into
Figuring out a way to effectively store and read profile pictures,
contacting the researcher who posted the application,
integration between multiple programs,
and making the website aesthetically pleasing
## Accomplishments that we're proud of
Created something that we would use,
built a relatively complex application with multiple components in a small period of time,
and created communication between multiple users of the website through built in chat and smtp
## What we learned
New CSS Framework,
more about the different React Hooks,
API Development,
and API Integration
## What's next for Research Finder
Integrating grants,
notifications,
and finding a userbase