
        let players = [];
        let tournament = [];
        let thirdPlaceMatch = null;
        let finalResults = {
            first: null,
            second: null,
            third: null,
            fourth: null
        };
        let selectedByes = new Set();
        let numByesNeeded = 0;
        let focusMode = false;
        let currentFocusMatch = null;

        // Initialize player count selector
        document.getElementById('playerCount').addEventListener('change', function() {
            const count = parseInt(this.value);
            if (count) {
                showPlayerInputs(count);
            }
        });

        function showPlayerInputs(count) {
            const container = document.getElementById('playersInput');
            container.innerHTML = '';
            
            for (let i = 1; i <= count; i++) {
                const div = document.createElement('div');
                div.className = 'player-input-group';
                div.innerHTML = `
                    <span class="player-number">#${i}</span>
                    <input type="text" id="player${i}" placeholder="${t('setup.playerName')} ${i}" required>
                    <div class="photo-upload-container">
                        <label for="photo${i}" class="photo-upload-label">
                            <span class="photo-icon">📷</span>
                            <span class="photo-text">${t('setup.photoOptional')}</span>
                        </label>
                        <input type="file" id="photo${i}" class="photo-input" accept="image/*">
                        <div id="preview${i}" class="photo-preview"></div>
                    </div>
                `;
                container.appendChild(div);
                
                // Add change listener for photo upload
                document.getElementById(`photo${i}`).addEventListener('change', function(e) {
                    handlePhotoUpload(e, i);
                });
            }
            
            document.getElementById('playersInputContainer').style.display = 'block';
        }

        function handlePhotoUpload(event, playerNum) {
            const file = event.target.files[0];
            const preview = document.getElementById(`preview${playerNum}`);
            
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    preview.innerHTML = `<img src="${e.target.result}" alt="Photo joueur ${playerNum}">`;
                    preview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                preview.innerHTML = '';
                preview.style.display = 'none';
            }
        }

        function continueToByeSelection() {
            const count = parseInt(document.getElementById('playerCount').value);
            players = [];
            
            // Collect player names and photos
            for (let i = 1; i <= count; i++) {
                const name = document.getElementById(`player${i}`).value.trim();
                if (!name) {
                    alert(t('alert.enterPlayerName', { number: i }));
                    return;
                }
                
                // Get photo if uploaded
                const photoPreview = document.getElementById(`preview${i}`);
                let photoUrl = null;
                if (photoPreview.querySelector('img')) {
                    photoUrl = photoPreview.querySelector('img').src;
                }
                
                players.push({
                    id: i,
                    name: name,
                    photo: photoUrl,
                    hasBye: false
                });
            }
            
            // Calculate if byes are needed
            const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(count)));
            numByesNeeded = nextPowerOf2 - count;
            
            if (numByesNeeded === 0) {
                // No byes needed, go directly to tournament
                startTournament();
            } else {
                // Show bye selection phase
                showByeSelection();
            }
        }

        function showByeSelection() {
            // Hide setup phase
            document.getElementById('setupPhase').style.display = 'none';
            
            // Show bye selection phase
            document.getElementById('byeSelectionPhase').style.display = 'block';
            
            // Update info text
            const byeInfo = document.getElementById('byeSelectionInfo');
			byeInfo.setAttribute('data-i18n-count', numByesNeeded);
			byeInfo.textContent = t('bye.info', { count: numByesNeeded });
			
            // Reset selection
            selectedByes.clear();
            
            // Create player list
            const listDiv = document.getElementById('byePlayersList');
            listDiv.innerHTML = '';
            
            players.forEach((player) => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'bye-player-item';
                itemDiv.onclick = () => toggleByeSelection(player.id);
                
                const photoHtml = player.photo 
                    ? `<img src="${player.photo}" alt="${player.name}" style="width: 35px; height: 35px; border-radius: 50%; object-fit: cover;">` 
                    : `<div class="bye-player-icon">${player.id}</div>`;
                
                itemDiv.innerHTML = `
                    <div class="bye-checkbox" id="checkbox-${player.id}"></div>
                    <div class="bye-player-info">
                        ${photoHtml}
                        <div class="bye-player-name">${player.name}</div>
                    </div>
                `;
                
                listDiv.appendChild(itemDiv);
            });

                //Mandatory to check if all byes players are properly sets
		updateByeSelectionUI()
        }

        function toggleByeSelection(playerId) {
            if (selectedByes.has(playerId)) {
                // Deselect
                selectedByes.delete(playerId);
            } else {
                // Select only if we haven't reached the limit
                if (selectedByes.size < numByesNeeded) {
                    selectedByes.add(playerId);
                } else {
                    alert(t('bye.limitReached', { count: numByesNeeded }));
                    return;
                }
            }
            
            updateByeSelectionUI();
        }

        function updateByeSelectionUI() {
            players.forEach((player) => {
                const itemDiv = document.querySelector(`.bye-player-item:has(#checkbox-${player.id})`);
                const checkbox = document.getElementById(`checkbox-${player.id}`);
                
                if (selectedByes.has(player.id)) {
                    itemDiv.classList.add('selected');
                    checkbox.textContent = '✓';
                } else {
                    itemDiv.classList.remove('selected');
                    checkbox.textContent = '';
                }
            });
            
            // Enable/disable start button
            const startBtn = document.getElementById('startTournamentBtn');
            if (selectedByes.size === numByesNeeded) {
                startBtn.disabled = false;
            } else {
                startBtn.disabled = true;
            }
        }

        function randomByeSelection() {
            selectedByes.clear();
            
            // Create array of available player IDs
            const availableIds = players.map(p => p.id);
            
            // Shuffle and select first N
            for (let i = availableIds.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [availableIds[i], availableIds[j]] = [availableIds[j], availableIds[i]];
            }
            
            // Select first N players
            for (let i = 0; i < numByesNeeded; i++) {
                selectedByes.add(availableIds[i]);
            }
            
            updateByeSelectionUI();
        }

        function clearByeSelection() {
            selectedByes.clear();
            updateByeSelectionUI();
        }

        function backToPlayerInput() {
            document.getElementById('byeSelectionPhase').style.display = 'none';
            document.getElementById('setupPhase').style.display = 'block';
            selectedByes.clear();
        }

        function startTournament() {
            // Mark players with byes
            players.forEach(player => {
                player.hasBye = selectedByes.has(player.id);
            });
            
            // Shuffle only non-bye players
            const byePlayers = players.filter(p => p.hasBye);
            const regularPlayers = players.filter(p => !p.hasBye);
            
            // Shuffle regular players
            for (let i = regularPlayers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [regularPlayers[i], regularPlayers[j]] = [regularPlayers[j], regularPlayers[i]];
            }
            
            // Reconstruct players array: regular players first, then bye players
            players = [...regularPlayers, ...byePlayers];
            
            // Create tournament bracket
            createBracket();
            
            // Switch views
            document.getElementById('setupPhase').style.display = 'none';
            document.getElementById('byeSelectionPhase').style.display = 'none';
            document.getElementById('tournamentPhase').style.display = 'block';
            
            // Render bracket
            renderBracket();
            
            // Show keyboard hint
            showKeyboardHint();
            
            // Auto-activate focus mode on first match
            setTimeout(() => {
                activateFocusMode();
            }, 1000);
        }

        function createBracket() {
            tournament = [];
            thirdPlaceMatch = null;
            finalResults = {
                first: null,
                second: null,
                third: null,
                fourth: null
            };
            
            const totalPlayers = players.length;
            
            // Find next power of 2
            const nextPowerOf2 = Math.pow(2, Math.ceil(Math.log2(totalPlayers)));
            const numByes = nextPowerOf2 - totalPlayers;
            
            // Calculate number of rounds
            const numRounds = Math.log2(nextPowerOf2);
            
            // Separate bye players and regular players
            const byePlayers = players.filter(p => p.hasBye);
            const regularPlayers = players.filter(p => !p.hasBye);
            
            // Calculate real matches (where 2 players actually compete)
            const realMatches = regularPlayers.length / 2;
            
            // Round 1 - Create matches
            const firstRound = [];
            let regularIndex = 0;
            let byeIndex = 0;
            
            // First, add all real matches
            for (let i = 0; i < realMatches; i++) {
                firstRound.push({
                    player1: regularPlayers[regularIndex++],
                    player2: regularPlayers[regularIndex++],
                    winner: null,
                    loser: null,
                    isBye: false
                });
            }
            
            // Then add bye matches
            while (byeIndex < byePlayers.length) {
                const player = byePlayers[byeIndex++];
                firstRound.push({
                    player1: player,
                    player2: null,
                    winner: player,
                    loser: null,
                    isBye: true
                });
            }
            
            tournament.push(firstRound);
            
            // Create remaining rounds
            let matchCount = nextPowerOf2 / 2;
            for (let r = 1; r < numRounds; r++) {
                matchCount = matchCount / 2;
                const round = [];
                for (let i = 0; i < matchCount; i++) {
                    round.push({
                        player1: null,
                        player2: null,
                        winner: null,
                        loser: null,
                        isBye: false
                    });
                }
                tournament.push(round);
            }
            
            // Auto-advance bye winners to round 2
            for (let i = 0; i < firstRound.length; i++) {
                if (firstRound[i].isBye && firstRound[i].winner) {
                    const nextRound = tournament[1];
                    const nextMatchIndex = Math.floor(i / 2);
                    const nextMatch = nextRound[nextMatchIndex];
                    
                    if (i % 2 === 0) {
                        nextMatch.player1 = firstRound[i].winner;
                    } else {
                        nextMatch.player2 = firstRound[i].winner;
                    }
                }
            }
            
            // Initialize third place match (will be populated after semi-finals)
            thirdPlaceMatch = {
                player1: null,
                player2: null,
                winner: null,
                loser: null,
                isBye: false
            };
        }

        function renderBracket() {
            const bracketDiv = document.getElementById('bracket');
            bracketDiv.innerHTML = '';
            
            const numRounds = tournament.length;
            
            // Special case for very small tournaments (2 players = just final)
            if (numRounds === 1) {
                const finalRound = tournament[0];
                const finalDiv = document.createElement('div');
                finalDiv.className = 'round';
                
                const finalTitle = document.createElement('div');
                finalTitle.className = 'round-title';
                //finalTitle.textContent = 'FINALE';
				finalTitle.textContent = t('tournament.final');
                finalDiv.appendChild(finalTitle);
                
                finalRound.forEach((match, matchIndex) => {
                    const matchDiv = createMatchElement(match, 0, matchIndex, false);
                    finalDiv.appendChild(matchDiv);
                });
                
                bracketDiv.appendChild(finalDiv);
                return;
            }
            
            // For normal tournaments: Left - Center - Right layout
            
            // LEFT SIDE: All rounds before semi-finals, top half of bracket
            const leftDiv = document.createElement('div');
            leftDiv.className = 'bracket-left';
            
            for (let roundIndex = 0; roundIndex < numRounds - 2; roundIndex++) {
                const round = tournament[roundIndex];
                const roundDiv = document.createElement('div');
                roundDiv.className = 'round';
                
                const roundTitle = document.createElement('div');
                roundTitle.className = 'round-title';
                roundTitle.textContent = `ROUND ${roundIndex + 1}`;
                roundDiv.appendChild(roundTitle);
                
                // Top half of matches only
                const totalMatches = round.length;
                const halfPoint = Math.ceil(totalMatches / 2);
                
                for (let matchIndex = 0; matchIndex < halfPoint; matchIndex++) {
                    const match = round[matchIndex];
                    const matchDiv = createMatchElement(match, roundIndex, matchIndex, false);
                    roundDiv.appendChild(matchDiv);
                }
                
                leftDiv.appendChild(roundDiv);
            }
            
            // CENTER: Semi-finals, Third Place, Final
            const centerDiv = document.createElement('div');
            centerDiv.className = 'bracket-center';
            
            // Semi-finals
            const semiRound = tournament[numRounds - 2];
            const semiDiv = document.createElement('div');
            semiDiv.className = 'round';
            
            const semiTitle = document.createElement('div');
            semiTitle.className = 'round-title';
			
			//semiTitle.textContent = 'DEMI-FINALES';
            semiTitle.textContent = t('tournament.semiFinals');
            semiDiv.appendChild(semiTitle);
            
            semiRound.forEach((match, matchIndex) => {
                const matchDiv = createMatchElement(match, numRounds - 2, matchIndex, false);
                semiDiv.appendChild(matchDiv);
            });
            
            centerDiv.appendChild(semiDiv);
            
            // Third place match
            if (thirdPlaceMatch && (thirdPlaceMatch.player1 || thirdPlaceMatch.player2)) {
                const thirdPlaceDiv = document.createElement('div');
                thirdPlaceDiv.className = 'round';
                
                const thirdPlaceTitle = document.createElement('div');
                thirdPlaceTitle.className = 'round-title';
                thirdPlaceTitle.style.color = '#FFD23F';
                //thirdPlaceTitle.textContent = '3ÈME PLACE';
				thirdPlaceTitle.textContent = t('tournament.thirdPlace');
				
                thirdPlaceDiv.appendChild(thirdPlaceTitle);
                
                const matchDiv = createMatchElement(thirdPlaceMatch, -1, -1, true);
                thirdPlaceDiv.appendChild(matchDiv);
                
                centerDiv.appendChild(thirdPlaceDiv);
            }
            
            // Final
            const finalRound = tournament[numRounds - 1];
            const finalDiv = document.createElement('div');
            finalDiv.className = 'round';
            
            const finalTitle = document.createElement('div');
            finalTitle.className = 'round-title';
            //finalTitle.textContent = 'FINALE';
			finalTitle.textContent = t('tournament.final');
            finalDiv.appendChild(finalTitle);
            
            finalRound.forEach((match, matchIndex) => {
                const matchDiv = createMatchElement(match, numRounds - 1, matchIndex, false);
                finalDiv.appendChild(matchDiv);
            });
            
            centerDiv.appendChild(finalDiv);
            
            // RIGHT SIDE: All rounds before semi-finals, bottom half of bracket (in REVERSE order)
            const rightDiv = document.createElement('div');
            rightDiv.className = 'bracket-right';
            
            // Display rounds in reverse order for right side
            for (let roundIndex = numRounds - 3; roundIndex >= 0; roundIndex--) {
                const round = tournament[roundIndex];
                const roundDiv = document.createElement('div');
                roundDiv.className = 'round';
                
                const roundTitle = document.createElement('div');
                roundTitle.className = 'round-title';
                roundTitle.textContent = `ROUND ${roundIndex + 1}`;
                roundDiv.appendChild(roundTitle);
                
                // Bottom half of matches only
                const totalMatches = round.length;
                const halfPoint = Math.ceil(totalMatches / 2);
                
                for (let matchIndex = halfPoint; matchIndex < totalMatches; matchIndex++) {
                    const match = round[matchIndex];
                    const matchDiv = createMatchElement(match, roundIndex, matchIndex, false);
                    roundDiv.appendChild(matchDiv);
                }
                
                rightDiv.appendChild(roundDiv);
            }
            
            // Assemble the full bracket
            bracketDiv.appendChild(leftDiv);
            bracketDiv.appendChild(centerDiv);
            bracketDiv.appendChild(rightDiv);
        }

        function createMatchElement(match, roundIndex, matchIndex, isThirdPlace = false) {
            const matchDiv = document.createElement('div');
            matchDiv.className = 'match';
            
            // Add focused class if this is the current focus match
            if (focusMode && currentFocusMatch) {
                if (isThirdPlace && currentFocusMatch.isThirdPlace) {
                    matchDiv.classList.add('focused');
                } else if (!isThirdPlace && 
                          currentFocusMatch.roundIndex === roundIndex && 
                          currentFocusMatch.matchIndex === matchIndex) {
                    matchDiv.classList.add('focused');
                }
            }
            
            // Add bye indicator if applicable
            if (match.isBye) {
                matchDiv.style.opacity = '0.6';
            }
            
            // Player 1
            const player1Div = document.createElement('div');
            player1Div.className = 'player';
            
            if (match.player1) {
                player1Div.classList.add('active');
                // Compare by ID instead of object reference
                if (match.winner && match.winner.id === match.player1.id) {
                    player1Div.classList.add('winner');
                } else if (match.winner) {
                    player1Div.classList.add('loser');
                }
                
                const player1PhotoHtml = match.player1.photo 
                    ? `<img src="${match.player1.photo}" class="player-photo ${match.winner && match.winner.id !== match.player1.id ? 'loser-photo' : ''}" alt="${match.player1.name}">` 
                    : ``;
                
                player1Div.innerHTML = `
                    <div class="player-icon">${match.player1.id}</div>
                    <span>${match.player1.name}</span>
                    ${player1PhotoHtml}
                `;
                
                if (!match.winner && match.player1 && match.player2 && !match.isBye) {
                    if (isThirdPlace) {
                        player1Div.onclick = () => selectThirdPlaceWinner(match.player1);
                    } else {
                        player1Div.onclick = () => selectWinner(roundIndex, matchIndex, match.player1);
                    }
                }
            } else {
                player1Div.classList.add('pending');
                player1Div.innerHTML = `
                    <div class="player-icon">?</div>
                    <span>En attente...</span>
                `;
            }
            
            // VS divider
            const vsDiv = document.createElement('div');
            vsDiv.className = 'vs-divider';
            vsDiv.textContent = match.isBye ? '' : 'VS';
            
            // Player 2
            const player2Div = document.createElement('div');
            player2Div.className = 'player';
            
            if (match.isBye && match.player1) {
                // Display BYE for automatic advancement
                player2Div.classList.add('pending');
                player2Div.innerHTML = `
                    <div class="player-icon" style="background: var(--accent);">✓</div>
                    <span style="color: var(--accent); font-weight: 700;">BYE - Qualifié d'office</span>
                `;
            } else if (match.player2) {
                player2Div.classList.add('active');
                // Compare by ID instead of object reference
                if (match.winner && match.winner.id === match.player2.id) {
                    player2Div.classList.add('winner');
                } else if (match.winner) {
                    player2Div.classList.add('loser');
                }
                
                const player2PhotoHtml = match.player2.photo 
                    ? `<img src="${match.player2.photo}" class="player-photo ${match.winner && match.winner.id !== match.player2.id ? 'loser-photo' : ''}" alt="${match.player2.name}">` 
                    : ``;
                
                player2Div.innerHTML = `
                    <div class="player-icon">${match.player2.id}</div>
                    <span>${match.player2.name}</span>
                    ${player2PhotoHtml}
                `;
                
                if (!match.winner && match.player1 && match.player2 && !match.isBye) {
                    if (isThirdPlace) {
                        player2Div.onclick = () => selectThirdPlaceWinner(match.player2);
                    } else {
                        player2Div.onclick = () => selectWinner(roundIndex, matchIndex, match.player2);
                    }
                }
            } else {
                player2Div.classList.add('pending');
                player2Div.innerHTML = `
                    <div class="player-icon">?</div>
                    <span>En attente...</span>
                `;
            }
            
            matchDiv.appendChild(player1Div);
            matchDiv.appendChild(vsDiv);
            matchDiv.appendChild(player2Div);
            
            return matchDiv;
        }

        function selectWinner(roundIndex, matchIndex, winner) {
            const match = tournament[roundIndex][matchIndex];
            
            // Prevent changing winner if already set or if it's a bye
            if (match.winner || match.isBye) return;
            
            // Set winner and loser (compare by ID)
            match.winner = winner;
            match.loser = (match.player1.id === winner.id) ? match.player2 : match.player1;
            
            // Check if this is a semi-final (one round before final)
            const isSemiFinal = (roundIndex === tournament.length - 2);
            
            if (isSemiFinal) {
                // Add loser to third place match
                if (!thirdPlaceMatch.player1) {
                    thirdPlaceMatch.player1 = match.loser;
                } else {
                    thirdPlaceMatch.player2 = match.loser;
                }
            }
            
            // Advance winner to next round
            if (roundIndex < tournament.length - 1) {
                const nextRound = tournament[roundIndex + 1];
                const nextMatchIndex = Math.floor(matchIndex / 2);
                const nextMatch = nextRound[nextMatchIndex];
                
                if (matchIndex % 2 === 0) {
                    nextMatch.player1 = winner;
                } else {
                    nextMatch.player2 = winner;
                }
            }
            
            // Check if tournament final is complete
            if (roundIndex === tournament.length - 1) {
                finalResults.first = winner;
                finalResults.second = match.loser;
                
                // Only show winner if third place match is also complete
                if (thirdPlaceMatch.winner) {
                    showPodium();
                }
            }
            
            // Re-render bracket
            renderBracket();
            
            // Auto-focus on next match
            if (focusMode) {
                setTimeout(() => {
                    activateFocusMode();
                }, 500);
            }
        }
        
        function selectThirdPlaceWinner(winner) {
            // Prevent changing winner if already set
            if (thirdPlaceMatch.winner) return;
            
            // Set winner and loser (compare by ID)
            thirdPlaceMatch.winner = winner;
            thirdPlaceMatch.loser = (thirdPlaceMatch.player1.id === winner.id) ? 
                thirdPlaceMatch.player2 : thirdPlaceMatch.player1;
            
            finalResults.third = winner;
            finalResults.fourth = thirdPlaceMatch.loser;
            
            // Check if final is also complete
            if (finalResults.first) {
                showPodium();
            }
            
            // Re-render bracket
            renderBracket();
            
            // Auto-focus on next match (final)
            if (focusMode) {
                setTimeout(() => {
                    activateFocusMode();
                }, 500);
            }
        }

        function showPodium() {
            const winnerDisplay = document.getElementById('winnerDisplay');
            const championName = document.getElementById('championName');
            
            // Deactivate focus mode
            deactivateFocusMode();
            
            // Hide keyboard hint
            hideKeyboardHint();
            
            // Create photo HTML for podium - only if photo exists
            const getPhotoHtml = (player, size) => {
                if (player.photo) {
                    return `<img src="${player.photo}" style="width: ${size}px; height: ${size}px; border-radius: 50%; object-fit: cover; margin-bottom: 1rem; border: 3px solid currentColor;">`;
                }
                return ''; // No space reserved if no photo
            };
            
            // Create podium HTML
            championName.innerHTML = `
                <div style="display: flex; justify-content: center; align-items: flex-end; gap: 2rem; margin: 2rem 0;">
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🥈</div>
                        ${getPhotoHtml(finalResults.second, 80)}
                        <div style="background: linear-gradient(135deg, #C0C0C0, #E8E8E8); color: #252A34; padding: 1.5rem; border-radius: 15px; font-size: 1.8rem; min-width: 200px; transform: translateY(30px);">
                            ${finalResults.second.name}
                        </div>
                        <div style="color: #C0C0C0; font-size: 1.2rem; margin-top: 0.5rem; font-weight: 600;">2ÈME PLACE</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 4rem; margin-bottom: 0.5rem;">🥇</div>
                        ${getPhotoHtml(finalResults.first, 120)}
                        <div style="background: linear-gradient(135deg, #FFD700, #FFA500); color: #252A34; padding: 2rem; border-radius: 15px; font-size: 2.5rem; min-width: 250px; box-shadow: 0 10px 40px rgba(255, 215, 0, 0.4);">
                            ${finalResults.first.name}
                        </div>
                        <div style="color: #FFD700; font-size: 1.5rem; margin-top: 0.5rem; font-weight: 700;">CHAMPION</div>
                    </div>
                    <div style="text-align: center;">
                        <div style="font-size: 3rem; margin-bottom: 0.5rem;">🥉</div>
                        ${getPhotoHtml(finalResults.third, 80)}
                        <div style="background: linear-gradient(135deg, #CD7F32, #E5A878); color: #252A34; padding: 1.5rem; border-radius: 15px; font-size: 1.8rem; min-width: 200px; transform: translateY(30px);">
                            ${finalResults.third.name}
                        </div>
                        <div style="color: #CD7F32; font-size: 1.2rem; margin-top: 0.5rem; font-weight: 600;">3ÈME PLACE</div>
                    </div>
                </div>
            `;
            
            winnerDisplay.classList.add('active');
            
            // Scroll to podium
            setTimeout(() => {
                winnerDisplay.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }

        function resetTournament() {
            document.getElementById('setupPhase').style.display = 'block';
            document.getElementById('byeSelectionPhase').style.display = 'none';
            document.getElementById('tournamentPhase').style.display = 'none';
            document.getElementById('winnerDisplay').classList.remove('active');
            document.getElementById('playerCount').value = '';
            document.getElementById('playersInputContainer').style.display = 'none';
            players = [];
            tournament = [];
            thirdPlaceMatch = null;
            selectedByes.clear();
            numByesNeeded = 0;
            focusMode = false;
            currentFocusMatch = null;
            hideKeyboardHint();
            finalResults = {
                first: null,
                second: null,
                third: null,
                fourth: null
            };
        }

        // Find the next match to play
        function findNextMatch() {
            // Check all rounds except the final
            for (let roundIndex = 0; roundIndex < tournament.length - 1; roundIndex++) {
                const round = tournament[roundIndex];
                for (let matchIndex = 0; matchIndex < round.length; matchIndex++) {
                    const match = round[matchIndex];
                    // Found a match with both players and no winner yet
                    if (match.player1 && match.player2 && !match.winner && !match.isBye) {
                        return { match, roundIndex, matchIndex, isThirdPlace: false };
                    }
                }
            }
            
            // Check third place match (before final!)
            if (thirdPlaceMatch && thirdPlaceMatch.player1 && thirdPlaceMatch.player2 && !thirdPlaceMatch.winner) {
                return { match: thirdPlaceMatch, roundIndex: -1, matchIndex: -1, isThirdPlace: true };
            }
            
            // Check final (last)
            const finalRound = tournament[tournament.length - 1];
            for (let matchIndex = 0; matchIndex < finalRound.length; matchIndex++) {
                const match = finalRound[matchIndex];
                if (match.player1 && match.player2 && !match.winner && !match.isBye) {
                    return { match, roundIndex: tournament.length - 1, matchIndex, isThirdPlace: false };
                }
            }
            
            return null; // Tournament is complete
        }

        // Activate focus mode
        function activateFocusMode() {
            const nextMatch = findNextMatch();
            if (!nextMatch) {
                console.log('No match to focus on');
                return;
            }
            
            focusMode = true;
            currentFocusMatch = nextMatch;
            
            // Add focus class to bracket
            const bracketDiv = document.getElementById('bracket');
            bracketDiv.classList.add('focus-mode');
            
            // Re-render to apply focus class
            renderBracket();
            
            // Show indicator briefly
            const indicator = document.getElementById('focusIndicator');
            indicator.classList.add('active');
            setTimeout(() => {
                indicator.classList.remove('active');
            }, 2000);
            
            // Scroll to focused match
            setTimeout(() => {
                const focusedElement = document.querySelector('.match.focused');
                if (focusedElement) {
                    focusedElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }, 100);
        }

        // Deactivate focus mode
        function deactivateFocusMode() {
            focusMode = false;
            currentFocusMatch = null;
            
            const bracketDiv = document.getElementById('bracket');
            bracketDiv.classList.remove('focus-mode');
            
            // Re-render to remove focus class
            renderBracket();
        }

        // Setup keyboard controls
        document.addEventListener('keydown', function(event) {
            // Only activate in tournament phase
            if (document.getElementById('tournamentPhase').style.display !== 'block') {
                return;
            }
            
            if (event.key === 'Escape') {
                deactivateFocusMode();
            } else if (event.key === 'z' || event.key === 'Z') {
                activateFocusMode();
            }
        });

        // Show keyboard hint when tournament starts
        function showKeyboardHint() {
            const hint = document.getElementById('keyboardHint');
            hint.style.display = 'flex';
            hint.classList.remove('minimized');
            
            let isAutoMinimized = false;
            
            // Auto-minimize after 5 seconds
            const minimizeTimer = setTimeout(() => {
                hint.classList.add('minimized');
                isAutoMinimized = true;
            }, 5000);
            
            // Expand on hover
            hint.onmouseenter = function() {
                this.classList.remove('minimized');
            };
            
            // Minimize on mouse leave (only after auto-minimization happened)
            hint.onmouseleave = function() {
                if (isAutoMinimized) {
                    this.classList.add('minimized');
                }
            };
        }

        // Hide keyboard hint
        function hideKeyboardHint() {
            const hint = document.getElementById('keyboardHint');
            hint.style.display = 'none';
            hint.classList.remove('minimized');
        }

        // Export tournament to JSON file
        function exportTournament() {
            const tournamentData = {
                version: "1.0",
                exportDate: new Date().toISOString(),
                players: players,
                tournament: tournament,
                thirdPlaceMatch: thirdPlaceMatch,
                finalResults: finalResults,
                selectedByes: Array.from(selectedByes),
                numByesNeeded: numByesNeeded
            };
            
            const dataStr = JSON.stringify(tournamentData, null, 2);
            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            
            const url = URL.createObjectURL(dataBlob);
            const link = document.createElement('a');
            link.href = url;
            
            // Generate filename with date
            const date = new Date().toISOString().slice(0, 10);
            link.download = `tournoi_${date}.json`;
            
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }

        // Import tournament from JSON file
        function importTournament(event) {
            const file = event.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const tournamentData = JSON.parse(e.target.result);
                    
                    // Validate data
                    if (!tournamentData.version || !tournamentData.players || !tournamentData.tournament) {
                        alert('Fichier de tournoi invalide');
                        return;
                    }
                    
                    // Restore tournament state
                    players = tournamentData.players;
                    tournament = tournamentData.tournament;
                    thirdPlaceMatch = tournamentData.thirdPlaceMatch;
                    finalResults = tournamentData.finalResults;
                    selectedByes = new Set(tournamentData.selectedByes || []);
                    numByesNeeded = tournamentData.numByesNeeded || 0;
                    
                    // Switch to tournament view
                    document.getElementById('setupPhase').style.display = 'none';
                    document.getElementById('byeSelectionPhase').style.display = 'none';
                    document.getElementById('tournamentPhase').style.display = 'block';
                    
                    // Render bracket
                    renderBracket();
                    
                    // Show podium if tournament is complete
                    if (finalResults.first && finalResults.second && finalResults.third) {
                        showPodium();
                    } else {
                        // Tournament in progress - show keyboard hint and activate focus
                        showKeyboardHint();
                        setTimeout(() => {
                            activateFocusMode();
                        }, 1000);
                    }
                    
                    // Reset file input
                    event.target.value = '';
                    
                } catch (error) {
                    console.error('Erreur lors de l\'import:', error);
                    alert('Erreur lors de l\'importation du fichier. Vérifiez que le fichier est valide.');
                }
            };
            reader.readAsText(file);
        }

