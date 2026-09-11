import os
from datetime import datetime
import subprocess
import sys

def run_command(command, description):
    """Run shell command and show output"""
    print(f"→ {description}")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        if result.stdout.strip():
            print(result.stdout.strip())
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ Failed: {e.stderr.strip()}")
        return False

if __name__ == "__main__":
    run_command("git add .", "Adding files to git")
    run_command(f'git commit -m "used push script"', "Committing changes")
    run_command("git push", "Pushing to GitHub")