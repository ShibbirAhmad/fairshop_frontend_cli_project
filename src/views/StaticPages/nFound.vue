<template>
    <div id="notfound">
		<div class="notfound">
			<div class="notfound-404">
				<h1>404</h1>
			</div>
			<h2>Oops, The Page you are looking for can't be found!</h2>
			
			<router-link to="/"><span class="arrow"></span>Return To Homepage</router-link>
		</div>
	</div>
</template>


<style  scoped>


div#notfound {
    margin: auto;
    width: 50%;
    background: #fff;
    text-align: center;
    padding: 10px 10px;
    margin-bottom: 10];
    margin-bottom: 50px;
    margin-top: 50px;
    border-radius: 10px;
    box-shadow: 3px 3px 3px #eee;
    padding-bottom: 50px;
}

.notfound-404 h1 {
    font-size: 98px;
    color: #2783c2;
    font-weight: 800;
}

.notfound h2 {
    font-size: 20px;
    font-weight: 600;
}
</style>