# Eksperter-i-Teams
Code for a webpage for a school project in Eksperter i Teams
The main goal is to have a functioning website both front and backend to showcase one part of the project
The webpage main objective is to take in parameters for energy usage that an offshore energy grid would require to sustain long mission in the sea withouth drawing energy from the main electrical network. This way it alows for a flexeble and expandable system in though situations where one might not have power.
After choosing your standards all the data gets sent to the backend server that is hosted on your local machine usnig Flask and Python OR on AWS. In the backend we run our algorithm to calculate the most benificial renawable technology for you to use in you specific situation so it is taylore made, including costs, reperation, lifespan, efectiveness, area usage, ease of use, and many more

# Start Script
To start hosting webpage on your PC simply run "START_WEBSITE.bat", or you could use command "python server.py", either one works :)
After that everyone in your local network will have acess to the webpage as long as your PC is running the script

# AWS
http://ec2-51-20-190-43.eu-north-1.compute.amazonaws.com:9999/
Go to this website that is hosted on AWS to see the website. Using AWS you can host this website front- and back- end anywhere in the world and anyone can acess it. Amazing :O

# AWS Cheet Sheet

```
ssh -i /path/to/your-key-pair.pem ec2-user@your-instance-public-dns
```

Once you have the instance you can ssh into it by saying:

```
ssh -i TestingHello123.pem ubuntu@<Domain-IP>
```

Domain-IP last time: 51.20.190.43

Now just run and install everything lol

Now launch everything

Use the following comand to forever make it run in the background no matter what

```
$ nohup ~/Eksperter-i-Teams/START_WEBSITE.bash &
```

Now go to AWS website to EC2 and instance, then seach for instances public DNS name
For us it was:

http://ec2-51-20-190-43.eu-north-1.compute.amazonaws.com:9999/

(The PORT and the end is for the webpage)
