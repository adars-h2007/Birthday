# Complete Guide: Installing Termux and Kali Linux in Termux

## Table of Contents
1. [Installing Termux](#1-installing-termux)
2. [Initial Termux Setup](#2-initial-termux-setup)
3. [Installing Kali Linux in Termux](#3-installing-kali-linux-in-termux)
4. [Starting and Using Kali Linux](#4-starting-and-using-kali-linux)
5. [Essential Kali Linux Commands](#5-essential-kali-linux-commands)
6. [Installing Tools in Kali Linux](#6-installing-tools-in-kali-linux)
7. [Troubleshooting](#7-troubleshooting)

---

## 1. Installing Termux

### Step 1.1: Download Termux
**Option A: F-Droid (Recommended)**
- Open your browser and go to: https://f-droid.org/
- Search for "Termux"
- Download and install Termux from F-Droid
- **Why F-Droid?** The Play Store version is outdated and no longer maintained

**Option B: GitHub**
- Go to: https://github.com/termux/termux-app/releases
- Download the latest APK file (e.g., `termux-app_vX.XXX.X+github-debug_arm64-v8a.apk`)
- Install the APK (enable "Install from Unknown Sources" if needed)

### Step 1.2: Grant Permissions
- Open Termux
- Grant storage permissions when prompted
- If not prompted, run: `termux-setup-storage`

---

## 2. Initial Termux Setup

### Step 2.1: Update Termux Packages
```bash
pkg update && pkg upgrade -y
```
- Press `Y` or `Enter` when prompted
- This updates the package repository and upgrades existing packages

### Step 2.2: Install Essential Packages
```bash
pkg install wget curl proot tar -y
```
- `wget` & `curl`: Download tools
- `proot`: Run Linux distributions without root
- `tar`: Extract compressed files

### Step 2.3: Fix Repository Issues (if any)
If you encounter repository errors:
```bash
termux-change-repo
```
- Select mirrors closest to your location
- Use arrow keys and space to select, Enter to confirm

---

## 3. Installing Kali Linux in Termux

### Method 1: Using NetHunter (Recommended)

#### Step 3.1: Install NetHunter Store
```bash
pkg install wget -y
wget -O nethunter.apk https://store.nethunter.com/NetHunter.apk
```
Then install the APK manually from your file manager.

#### Step 3.2: Install Kali NetHunter in Termux
```bash
pkg install wget -y
wget -O install-nethunter-termux https://offs.ec/2MceZWr
chmod +x install-nethunter-termux
./install-nethunter-termux
```

### Method 2: Using Andronix (Alternative)

#### Step 3.1: Install Andronix App
- Download Andronix from Play Store or F-Droid
- Open Andronix app

#### Step 3.2: Select Kali Linux
- In Andronix, select "Kali Linux"
- Choose your desktop environment (XFCE recommended for performance)
- Copy the installation command

#### Step 3.3: Run Installation in Termux
- Paste the copied command in Termux
- Press Enter and wait (10-30 minutes depending on internet speed)

### Method 3: Manual Installation (Advanced)

#### Step 3.1: Download Installation Script
```bash
pkg install wget proot tar -y
wget https://raw.githubusercontent.com/EXALAB/AnLinux-Resources/master/Scripts/Installer/Kali/kali.sh
```

#### Step 3.2: Make Script Executable
```bash
chmod +x kali.sh
```

#### Step 3.3: Run Installation
```bash
bash kali.sh
```

#### Step 3.4: Wait for Installation
- The script will download Kali Linux rootfs (~500MB-1GB)
- Installation takes 15-45 minutes depending on your connection
- Do not close Termux during installation

---

## 4. Starting and Using Kali Linux

### Step 4.1: Start Kali Linux

**For NetHunter:**
```bash
nethunter
```
or
```bash
nh
```

**For Andronix/Manual Installation:**
```bash
./start-kali.sh
```
or
```bash
kali
```

### Step 4.2: First Time Setup
Once inside Kali Linux:

```bash
# Update package lists
apt update && apt upgrade -y

# Install essential tools
apt install nano vim sudo -y
```

### Step 4.3: Create a User (Optional but Recommended)
```bash
# Add a new user
adduser yourusername

# Add user to sudo group
usermod -aG sudo yourusername

# Switch to new user
su - yourusername
```

### Step 4.4: Exit Kali Linux
```bash
exit
```

---

## 5. Essential Kali Linux Commands

### Basic Navigation
```bash
# Check current directory
pwd

# List files
ls -la

# Change directory
cd /path/to/directory

# Go to home directory
cd ~

# Go back one directory
cd ..
```

### System Information
```bash
# Check Kali version
cat /etc/os-release

# Check disk space
df -h

# Check memory usage
free -h

# Check running processes
ps aux
```

### Package Management
```bash
# Update package lists
apt update

# Upgrade all packages
apt upgrade -y

# Install a package
apt install package-name -y

# Remove a package
apt remove package-name

# Search for a package
apt search keyword
```

---

## 6. Installing Tools in Kali Linux

### Step 6.1: Install Kali Linux Tools

**Install Metasploit Framework:**
```bash
apt update
apt install metasploit-framework -y
msfconsole
```

**Install Nmap:**
```bash
apt install nmap -y
nmap --version
```

**Install Hydra:**
```bash
apt install hydra -y
```

**Install SQLMap:**
```bash
apt install sqlmap -y
```

**Install Aircrack-ng:**
```bash
apt install aircrack-ng -y
```

**Install John the Ripper:**
```bash
apt install john -y
```

**Install Wireshark (CLI version):**
```bash
apt install tshark -y
```

### Step 6.2: Install Kali Linux Tool Suite
```bash
# Install top 10 tools
apt install kali-linux-top10 -y

# Install all Kali tools (WARNING: Very large, 10GB+)
apt install kali-linux-large -y

# Install specific tool categories
apt install kali-tools-web -y          # Web application tools
apt install kali-tools-wireless -y     # Wireless tools
apt install kali-tools-passwords -y    # Password cracking tools
apt install kali-tools-exploitation -y # Exploitation tools
```

### Step 6.3: Install Python Tools
```bash
# Install Python 3 and pip
apt install python3 python3-pip -y

# Install common Python security libraries
pip3 install requests beautifulsoup4 scapy
```

---

## 7. Troubleshooting

### Issue 1: "Cannot connect to repository"
**Solution:**
```bash
# In Termux (not Kali)
termux-change-repo
# Select different mirrors
```

### Issue 2: "Command not found" when starting Kali
**Solution:**
```bash
# Check if start script exists
ls -la | grep kali

# If using NetHunter
nethunter

# If script exists but not executable
chmod +x start-kali.sh
./start-kali.sh
```

### Issue 3: "No space left on device"
**Solution:**
```bash
# Check available space
df -h

# Clean package cache in Termux
pkg clean

# Clean package cache in Kali
apt clean
apt autoclean
apt autoremove
```

### Issue 4: Slow Performance
**Solutions:**
- Close other apps to free RAM
- Use lightweight desktop environment (XFCE instead of KDE)
- Don't install all Kali tools, only what you need
- Restart Termux periodically

### Issue 5: "Permission denied" errors
**Solution:**
```bash
# In Termux, grant storage permissions
termux-setup-storage

# In Kali, use sudo
sudo command-here

# Or switch to root (not recommended for regular use)
sudo su
```

### Issue 6: Audio/GUI not working
**Note:** Termux runs in CLI mode by default. For GUI:
```bash
# Install VNC server in Kali
apt install tigervnc-standalone-server -y

# Install VNC viewer app on Android (e.g., VNC Viewer from Play Store)

# Start VNC server
vncserver

# Connect using VNC Viewer app to localhost:5901
```

---

## Additional Tips

### Tip 1: Create Aliases for Quick Access
In Termux, edit `.bashrc`:
```bash
nano ~/.bashrc

# Add this line
alias kali='./start-kali.sh'

# Save and reload
source ~/.bashrc
```

### Tip 2: Keep Everything Updated
```bash
# Update Termux
pkg update && pkg upgrade -y

# Update Kali (run inside Kali)
apt update && apt upgrade -y
```

### Tip 3: Backup Your Setup
```bash
# In Termux, backup Kali installation
tar -czf kali-backup.tar.gz kali-fs/

# Restore if needed
tar -xzf kali-backup.tar.gz
```

### Tip 4: Use Screen or Tmux for Multiple Sessions
```bash
# Install in Termux
pkg install tmux -y

# Start tmux
tmux

# Create new window: Ctrl+B then C
# Switch windows: Ctrl+B then N
# Detach: Ctrl+B then D
# Reattach: tmux attach
```

---

## Important Notes

⚠️ **Legal Disclaimer:**
- Use Kali Linux tools only on systems you own or have explicit permission to test
- Unauthorized access to computer systems is illegal
- This guide is for educational purposes only

⚠️ **Limitations:**
- Some tools requiring kernel modules won't work (e.g., WiFi monitoring mode)
- No root access to Android system (unless device is rooted)
- Performance depends on your device specifications
- Some hardware-dependent tools may not function

⚠️ **Best Practices:**
- Don't run as root unless necessary
- Keep systems updated
- Use strong passwords
- Backup important data
- Learn commands before using powerful tools

---

## Quick Reference Card

```
┌─────────────────────────────────────────────┐
│         TERMUX & KALI QUICK COMMANDS        │
├─────────────────────────────────────────────┤
│ Start Kali:        nethunter or ./start-kali│
│ Exit Kali:         exit                     │
│ Update Termux:     pkg update && pkg upgrade│
│ Update Kali:       apt update && apt upgrade│
│ Install in Termux: pkg install package-name │
│ Install in Kali:   apt install package-name │
│ Clear screen:      clear                    │
│ List files:        ls -la                   │
│ Change dir:        cd /path                 │
│ Edit file:         nano filename            │
│ Root access:       sudo su                  │
└─────────────────────────────────────────────┘
```

---

## Resources

- **Termux Wiki:** https://wiki.termux.com/
- **Kali Linux Docs:** https://www.kali.org/docs/
- **NetHunter Docs:** https://www.kali.org/docs/nethunter/
- **Andronix:** https://andronix.app/
- **Termux GitHub:** https://github.com/termux/termux-app

---

**Created:** November 2025  
**Last Updated:** November 2025  
**Version:** 1.0

Happy Learning! 🐧🔒
