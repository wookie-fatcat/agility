# Quick Installation Guide for Raspberry Pi

## Pre-requisites

You must be running a [64-bit version of Linux](https://www.raspberrypi.com/software/operating-systems/#raspberry-pi-os-64-bit) 
on your Raspberry Pi

## Step 1

Ensure you have Docker installed on your Raspberry Pi.  Here's some useful instructions:

- https://pimylifeup.com/raspberry-pi-docker/

## Step 2

Ensure you have *git* installed.  If not, type the following in Terminal

```console
apt install git
```

## Step 3

Make sure you're in your home directory, eg:

```console
cd ~
```

## Step 4

Clone the *mg-showcase* Repository:

```console
git clone https://github.com/robtweed/mg-showcase
```

You'll now have a directory: *~/mg-showcase*

## Step 5

Switch to that directory, eg

```console
cd mg-showcase
```

## Step 6 

Build the *mg-showcase* Docker Container that we'll be using to provide the run-time environment for *Agility*:

```console
docker build -t mg-showcase -f dockerfiles/yottadb/Dockerfile --progress plain .
```

It may take a while - let it run to completion

## Step 7

Return to your home directory:

```console
cd ..
```

## Step 8

Clone the *Agility* Repository:

```console
git clone https://github.com/robtweed/agility
```

You'll now have a directory named *agility*: *~/agility*

## Step 9

Edit the file *config.json* that you'll see in the *~/agility* directory
and add your SolisCloud credentials to the empty locations.

Also make sure your Octopus zone is correct - change it as appropriate.

Save your edited version of *config.json*.

## Step 10

Start the Docker container and map the *agility* directory into it.  Use the following command:

```console
docker run -it --name agility --rm -p 8080:8080 -e TZ=Europe/London -v ~/agility/src:/opt/mgateway/mapped mg-showcase
```

This ensures that:

- the time zone is correctly maintained within the container
- port 8080 is available for Agility's web interface
- the container is named *agility*, eg when you run to see the running container:

  - docker ps

The *Agility* environment is now set up and ready for use.  You'll normally leave the container running
constantly on your computer: it shouldn't need to be stopped, but if it does stop for any reason, just
restart it with the same *docker run* command above.

## Step 11 

- To start *Agility*:

```console
cd ~/agility/src   # if you're not already in this directory
./agility_start
```

- You can monitor *Agility*'s activity log at any time:

```console  
cd ~/agility/src    # if you're not already in this directory
./agility_log
```

- To restart *Agility* for any reason:

```console
cd ~/agility/src    # if you're not already in this directory
./agility_restart
```

- If *Agility* crashes for some unforseen reason, some of the information needed to investigate the
reasons behind the crash will be in the log (see above to list it). 

  Other useful information will be provided in the file:

```console
~/agility/src/agility.log

