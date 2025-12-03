try {
    const menuBtn = document.getElementById('hamburger');
    const mainMenu = document.getElementById('mainMenu');
    if (menuBtn && mainMenu) {
        menuBtn.addEventListener('click', () => {
            mainMenu.classList.toggle('hidden');
            mainMenu.setAttribute('aria-hidden', mainMenu.classList.contains('hidden') ? 'true' : 'false');
        });
    }

    document.querySelectorAll('#mainMenu a').forEach(a => {
        a.addEventListener('click', (e) => {
            e.preventDefault();
            const page = a.dataset.page;
            showPage(page);
            if (mainMenu) mainMenu.classList.add('hidden');
        });
    });

    // -- Topics array: NO Definition, NO Practice Problems topic --
    const repTopics = [
        {
            id: "rep",
            label: "Ways to Represent Relations",
            content: `
<h2>Ways to Represent Relations</h2>
<ul>
    <li>Set of Ordered Pairs: <code>{(1,2), (2,3), (3,1)}</code></li>
    <li>Table/List</li>
    <li>Directed Graph (Digraph) <br><img src="assets/images/rel_digraph.png" style="max-width:200px"></li>
    <li>Zero-One Matrix <br><img src="assets/images/rel_matrix.png" style="max-width:200px"></li>
    <li>Arrow Diagrams</li>
</ul>
`
        },
        {
            id: "types",
            label: "Types and Properties of Relations",
            content: `
<h2>Types and Properties of Relations</h2>
<ul>
    <li><b>Reflexive:</b> (a,a) for all a ∈ A</li>
    <li><b>Irreflexive:</b> No (a,a) for any a</li>
    <li><b>Symmetric:</b> If (a,b) ∈ R, then (b,a) ∈ R</li>
    <li><b>Antisymmetric:</b> If (a,b), (b,a) ∈ R, then a = b</li>
    <li><b>Transitive:</b> If (a,b), (b,c) ∈ R, then (a,c) ∈ R</li>
    <li><b>Equivalence Relation:</b> Reflexive, Symmetric, and Transitive</li>
    <li><b>Partial Order:</b> Reflexive, Antisymmetric, and Transitive</li>
</ul>
`
        },
        {
            id: "matrix",
            label: "Zero-One Matrix of Relations",
            content: `
<h2>Zero-One Matrix Representation</h2>
<p>The matrix M of relation R on set A = {a<sub>1</sub>,...,a<sub>n</sub>} has M[i][j] = 1 if (a<sub>i</sub>, a<sub>j</sub>) ∈ R, else 0.</p>
<pre>
   1 2 3
  -------
1| 1 0 1
2| 0 1 0
3| 1 1 1
</pre>
`
        },
        {
            id: "digraph",
            label: "Digraphs & Arrow Diagrams",
            content: `
<h2>Digraphs & Arrow Diagrams</h2>
<p>Relations can be visualized as directed graphs (digraphs), with elements as nodes and arrows for each pair (a,b) ∈ R.</p>
<img src="assets/images/rel_digraph.png" style="max-width:250px">
`
        },
        {
            id: "closure",
            label: "Closure of Relations",
            content: `
<h2>Closures of Relations</h2>
<ul>
    <li><b>Reflexive Closure:</b> Add (a,a) for all a ∈ A</li>
    <li><b>Symmetric Closure:</b> Add (b,a) for all (a,b) ∈ R</li>
    <li><b>Transitive Closure:</b> Add (a,c) whenever (a,b),(b,c) ∈ R</li>
</ul>
<pre>
If R = {(1,2),(2,3)}, transitive closure R* = {(1,2),(2,3),(1,3)}
</pre>
`
        },
        {
            id: "algorithms",
            label: "Algorithms for Closures (Warshall’s)",
            content: `
<h2>Algorithms for Closures</h2>
<p><b>Warshall’s Algorithm</b> quickly finds the transitive closure of a relation using its matrix.</p>
<pre>
Repeat for all k in {1..n}:
  For all i, j:
    Set M[i][j] = M[i][j] OR (M[i][k] AND M[k][j])
</pre>
`
        },
        {
            id: "applications",
            label: "Applications of Relations/Closures",
            content: `
<h2>Applications</h2>
<ul>
    <li>Database relationships</li>
    <li>Social networks (friendship, links)</li>
    <li>Accessibility, network connectivity</li>
    <li>Partial orders in task planning</li>
    <li>Equivalence relations in partitioning</li>
    <li>State machines, automata</li>
</ul>
`
        }
    ];

    // Render the topic buttons and show their content inline, directly below the button
    function renderTopicButtons() {
        const topicsList = document.getElementById('topicsList');
        topicsList.innerHTML = '';
        repTopics.forEach(topic => {
            // wrapper for button and inline content div
            const wrapper = document.createElement('div');
            wrapper.style.marginBottom = '8px';

            const btn = document.createElement('button');
            btn.className = 'topic-btn';
            btn.dataset.topic = topic.id;
            btn.innerText = topic.label;

            const contentDiv = document.createElement('div');
            contentDiv.className = 'topic-content-inline';
            contentDiv.style.display = 'none';

            btn.onclick = function() {
                document.querySelectorAll('.topic-content-inline').forEach(div => {
                    div.style.display = 'none';
                    div.innerHTML = '';
                });
                contentDiv.innerHTML = topic.content;
                contentDiv.style.display = 'block';
                contentDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            };

            wrapper.appendChild(btn);
            wrapper.appendChild(contentDiv);
            topicsList.appendChild(wrapper);
        });
    }

    // Show page function (adjusted so topics uses renderTopicButtons inline)
    let currentCategory = 'input';
    function showPage(page) {
        document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
        const el = document.getElementById(page);
        if (el) {
            el.classList.remove('hidden');
            el.scrollIntoView({ behavior: 'smooth' });
        }
        if (page === 'topics') renderTopicButtons();
        if (page === 'tools') initMatrixTool();
        if (page === 'quiz') loadQuiz();
    }

    // -- Matrix tool logic remains unchanged --
    function initMatrixTool() {
        const matrixList = document.getElementById('matrixList');
        const matrixBtn = document.getElementById('matrixBtn');
        const matrixInput = document.getElementById('matrixInput');
        const newMatrixBtn = document.getElementById('newMatrixBtn');
        const noMatrixMsg = document.getElementById('noMatrixMsg');

        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
                currentCategory = item.dataset.category;
                renderMatrix();
            });
        });

        if (newMatrixBtn) {
            newMatrixBtn.onclick = () => {
                matrixInput.value = '';
                matrixList.innerHTML = '';
                if (noMatrixMsg) noMatrixMsg.style.display = 'block';
            };
        }

       // Inside function initMatrixTool (replace ONLY the matrixBtn.onclick handler with this):

if (matrixBtn && matrixInput) {
    matrixBtn.onclick = () => {
        const input = matrixInput.value;
        const pairs = input.match(/\(([^)]+)\)/g);
        if (!pairs || !pairs.length) {
            matrixList.innerHTML = '<p>Enter at least one pair like (1,2),(2,3)</p>';
            if (noMatrixMsg) noMatrixMsg.style.display = 'none';
            return;
        }
        let elements = new Set();
        let relPairs = [];
        pairs.forEach(pair => {
            let nums = pair.replace(/[()]/g, '').split(',');
            if (nums.length === 2) {
                elements.add(nums[0].trim());
                elements.add(nums[1].trim());
                relPairs.push(nums.map(x => x.trim()));
            }
        });
        elements = Array.from(elements).sort();
        // Build Matrix
        let matrix = {};
        elements.forEach(row => {
            matrix[row] = {};
            elements.forEach(col => {
                matrix[row][col] = relPairs.some(([r, c]) => r === row && c === col) ? 1 : 0;
            });
        });

        // Analyze relation properties
        const isReflexive = elements.every(e => matrix[e][e] === 1);
        const isIrreflexive = elements.every(e => matrix[e][e] === 0);
        const isSymmetric = elements.every(
            r => elements.every(
                c => matrix[r][c] === matrix[c][r]
            )
        );
        const isAntisymmetric = elements.every(
            a => elements.every(
                b => (a === b) || (matrix[a][b] === 0 || matrix[b][a] === 0)
            )
        );
        // Transitive: for all a,b,c if (a,b) and (b,c) then (a,c)
        let isTransitive = true;
        elements.forEach(a => {
            elements.forEach(b => {
                elements.forEach(c => {
                    if (matrix[a][b] && matrix[b][c] && !matrix[a][c]) isTransitive = false;
                });
            });
        });

        // Matrix Table HTML
        let html = '<table><tr><th></th>' + elements.map(e => `<th>${e}</th>`).join('') + '</tr>';
        elements.forEach(row => {
            html += `<tr><td>${row}</td>`;
            elements.forEach(col => {
                html += `<td>${matrix[row][col]}</td>`;
            });
            html += '</tr>';
        });
        html += '</table>';

        // Properties Analysis HTML
        html += `<div style="margin-top:18px;padding:10px;background:#192c44;border-radius:8px">
            <strong>Analysis:</strong>
            <ul>
                <li>Reflexive: <b style="color:${isReflexive?'#3ae373':'#f37575'}">${isReflexive?'Yes':'No'}</b></li>
                <li>Irreflexive: <b style="color:${isIrreflexive?'#3ae373':'#f37575'}">${isIrreflexive?'Yes':'No'}</b></li>
                <li>Symmetric: <b style="color:${isSymmetric?'#3ae373':'#f37575'}">${isSymmetric?'Yes':'No'}</b></li>
                <li>Antisymmetric: <b style="color:${isAntisymmetric?'#3ae373':'#f37575'}">${isAntisymmetric?'Yes':'No'}</b></li>
                <li>Transitive: <b style="color:${isTransitive?'#3ae373':'#f37575'}">${isTransitive?'Yes':'No'}</b></li>
            </ul>
        </div>`;

        // D I G R A P H - in SVG
        // Create positions for each node in a circle
        const RADIUS = 90, CX = 120, CY = 120;
        const nodePos = {};
        elements.forEach((el, i) => {
            let angle = 2 * Math.PI * i / elements.length;
            nodePos[el] = {
                x: CX + RADIUS * Math.cos(angle),
                y: CY + RADIUS * Math.sin(angle)
            };
        });
        let svgNodes = '', svgEdges = '';
        // Edges
        relPairs.forEach(([from, to]) => {
            let start = nodePos[from], end = nodePos[to];
            let dx = end.x - start.x, dy = end.y - start.y;
            let len = Math.sqrt(dx*dx + dy*dy);
            let normX = dx / len, normY = dy / len;
            let arrowX = end.x - normX*14, arrowY = end.y - normY*14;
            // Edge line
            svgEdges += `<line x1="${start.x}" y1="${start.y}" x2="${arrowX}" y2="${arrowY}" stroke="#4facfe" stroke-width="2" marker-end="url(#arrowhead)"/>`;
        });
        // Nodes
        elements.forEach(el => {
            let pos = nodePos[el];
            svgNodes += `<circle cx="${pos.x}" cy="${pos.y}" r="16" fill="#0c223e"/><text x="${pos.x}" y="${pos.y+6}" text-anchor="middle" fill="#fff" font-size="15">${el}</text>`;
        });
        // SVG block
        html += `<div style="margin-top:18px;">
            <strong>Digraph Visualization:</strong><br>
            <svg width="260" height="260" style="background:#172749;border-radius:14px">
                <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="7" refY="3.5" orient="auto">
                        <polygon points="0 0, 10 3.5, 0 7" fill="#4facfe" />
                    </marker>
                </defs>
                ${svgEdges}
                ${svgNodes}
            </svg>
        </div>`;

        matrixList.innerHTML = html;
        if (noMatrixMsg) noMatrixMsg.style.display = 'none';
    };
}
   
    // Quiz remains unchanged, but adjust heading in HTML ("5 Question")
    const quizQuestions = [
        { q: 'Which is a way to represent a relation?', opts: ['Set of pairs', 'Digraph', 'Matrix', 'All of the above'], a: 3 },
        { q: 'The reflexive closure of R on {1,2} adds which pair?', opts: ['(1,2)', '(2,1)', '(1,1) and (2,2)', 'None'], a: 2 },
        { q: 'If (1,2) is in R, which pair is added in symmetric closure?', opts: ['(2,1)', '(1,1)', '(2,2)', 'None'], a: 0 },
        { q: 'Which closure adds (a,c) when (a,b) and (b,c) are in R?', opts: ['Reflexive', 'Symmetric', 'Transitive', 'None'], a: 2 },
        { q: 'Matrix entry M[2][3] = 1 means?', opts: ['Relation from 2 to 3', 'Relation from 3 to 2', 'No relation', 'Unknown'], a: 0 }
    ];

    function loadQuiz() {
        const area = document.getElementById('quizArea');
        if (!area) return;
        area.innerHTML = '';
        quizQuestions.forEach((qq, idx) => {
            const div = document.createElement('div'); div.className = 'quiz-card';
            div.innerHTML = `<p><strong>Q${idx + 1}:</strong> ${qq.q}</p>`;
            qq.opts.forEach((opt, i) => {
                const btn = document.createElement('button'); btn.innerText = opt;
                btn.onclick = () => {
                    if (i === qq.a) alert('Correct!');
                    else alert('Incorrect!');
                };
                div.appendChild(btn);
            });
            area.appendChild(div);
        });
    }

    showPage('home');
} catch (error) {
    console.error('Error:', error);
}
