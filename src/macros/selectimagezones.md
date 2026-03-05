<div style="width: 100%;" id="quiz-@0">
    <img src="@1" id="img-@0" usemap="#map-@0">
    <map id="map-@0" name="map-@0"></map>
    <canvas id="canvas-@0" style="position:absolute; left:0; top:0; pointer-events:none;"></canvas>
    <br>
    <span id="feedback-@0">Noch keine Zonen gefunden.</span>
</div>

<script>
    const quizData = [];

    function drawShape(ctx, shape, coords) {
        ctx.beginPath();

        switch (shape) {
            case 'poly':
                ctx.moveTo(coords[0], coords[1]);
                for (let i = 2; i < coords.length; i += 2) {
                    ctx.lineTo(coords[i], coords[i+1]);
                }
                ctx.lineTo(coords[0], coords[1]);
                break;
            case 'circle':
                let [x, y, r] = coords;
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                break;
            case 'rect':
                let [x1, y1, x2, y2] = coords;
                ctx.rect(x1, y1, x2 - x1, y2 - y1);
                break;
        }
        
        ctx.fill();
        ctx.stroke();
    }

    void setTimeout(() => {
        (function(){
            const quizId = '@0';
            const quizContainer = document.querySelector(`#quiz-${quizId}`);
            const img = quizContainer.querySelector(`#img-${quizId}`);
            const map = quizContainer.querySelector(`#map-${quizId}`);
            const feedback = quizContainer.querySelector(`#feedback-${quizId}`);

            const canvas = quizContainer.querySelector(`#canvas-${quizId}`);
            canvas.width = img.width;
            canvas.height = img.height;
            canvas.style.left = img.offsetLeft + 'px';
            canvas.style.top = img.offsetTop + 'px';
            canvas.style.width = img.width + 'px';
            canvas.style.height = img.height + 'px';
            const ctx = canvas.getContext('2d');
            ctx.strokeStyle = 'green';
            ctx.fillStyle = "rgba(0, 255, 0, 0.5)";
            ctx.lineWidth = 2;

            const dataKey = `quiz-${quizId}-data`;
            const savedData = JSON.parse(sessionStorage.getItem(dataKey)) ?? quizData;

            const areas = '@2'.replace(" ", "").split('|');

            areas.forEach(zone => {
                const coords = zone.split(";");

                const area = document.createElement('area');
                area.coords = coords.join(",");
                
                if (coords.length == 3) {
                    area.shape = "circle";
                } else if (coords.length == 4) {
                    area.shape = "rect";
                } else {
                    area.shape = "poly";
                };

                if (savedData.includes(area.coords)){
                    area.classList.add("found");

                    drawShape(ctx, area.shape, coords);

                    feedback.innerHTML = `${savedData.length} Zone(n) gefunden`;

                    if (savedData.length == areas.length){
                        feedback.innerHTML = "Alle Zonen gefunden!";
                        feedback.style.color = "rgb(var(--lia-success))";
                    }
                } else {
                    area.onclick = (() => {
                        if (!(area.classList.contains("found"))) {
                            area.classList.add("found");
                            savedData.push(area.coords);

                            drawShape(ctx, area.shape, coords);

                            feedback.innerHTML = `${savedData.length} Zone(n) gefunden`;

                            if (savedData.length == areas.length){
                                feedback.innerHTML = "Alle Zonen gefunden!";
                                feedback.style.color = "rgb(var(--lia-success))";
                            }

                            sessionStorage.setItem(dataKey, JSON.stringify(savedData));
                        };
                    });
                }

                map.appendChild(area);
            });

            
        })();
    }, 100);
</script>
