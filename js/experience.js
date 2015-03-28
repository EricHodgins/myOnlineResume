console.log("hello");


$(".job-details").click( function() {

	if ($(this).text() === "Job Details") {
		$(this).text("Hide");
	} else {
		$(this).text("Job Details");
	}

	$(this).next().slideToggle("slow");
});