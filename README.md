# FrontendExercise
This repository consists of my notes and exercises in my Web Development Bootcamp course on Udemy.

## Links
- [resources](https://www.appbrewery.co/p/web-development-course-resources/)

### localize the repository
```bash
mkdir -p ~/udemy/WebCamp/
cd ~/udemy/WebCamp/
git clone git@github.com:Orthologues/WebProgrammingExer.git
# OR "git remote set-url origin git@github.com:username/repo.git" if url needs to be changed
```
### perform git push without password
```bash
ssh-keygen -t rsa -C "your_email@example.com" # all default, no passphrase
```
Then copy the text in your `~/.ssh/id_rsa.pub` to create a ssh-key in your github settings.
```bash
git config --global user.email "you@example.com"
git config --global user.name "Your Name"
git push -u origin master
```

### perform ssh login without password
```bash
ssh-keygen # all default, no passphrase
ssh-copy-id -i ~/.ssh/id_rsa.pub UserName@RemoteServer # type password at the remote server
```
Now try logging into the machine, with <code>ssh username@remoteserver</code>, and check in:
<code>~/.ssh/authorized_keys</code> to make sure we haven't added extra keys that you weren't expecting.
```bash
ssh-add # run this command locally
```
