#!/bin/bash
echo "[*] Dispatching Claude 1..."
vibecrafted claude implement workflows/mission-claude.md > claude.log 2>&1 &
PID1=$!

echo "[*] Dispatching Claude 2..."
vibecrafted claude implement workflows/mission-claude2.md > claude2.log 2>&1 &
PID4=$!

echo "[*] Dispatching Codex..."
vibecrafted codex implement workflows/mission-codex.md > codex.log 2>&1 &
PID2=$!

echo "[*] Dispatching Gemini..."
vibecrafted gemini implement workflows/mission-gemini.md > gemini.log 2>&1 &
PID3=$!

echo "[*] Waiting for all agents to complete..."
wait $PID1
wait $PID4
wait $PID2
wait $PID3
echo "[*] All agents finished."
