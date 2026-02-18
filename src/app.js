console.log(`${document.title} page loaded.`);
document.body.insertAdjacentHTML('beforeend',
    `
    <footer style="margin-top: 3rem; text-align: center; font-size: 0.7rem; opacity: 0.7;">
        <p>&copy; 2026 Ian Chen</p>
        <p><a href="#">Back to top</a></p>
    </footer>
`);
console.log(`Injected footer.`);