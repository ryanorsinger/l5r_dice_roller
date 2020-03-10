function updateTargetNumber(val) {
    val = parseInt(val);
    console.log(val)

    if (document.getElementById('target_number').value != val) {
        document.getElementById('target_number').value = val;
    }

    if (document.getElementById('points').value != val) {
        document.getElementById('points').value = val;
    }
}





