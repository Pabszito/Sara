#!/bin/sh
while true
do
  echo "[INFO] Starting bot..."
  npm start
  for i in 5 4 3 2 1
  do
    echo "[INFO] Restarting in $i..."
    sleep 1
  done
echo "[INFO] Restarting the bot."
done
