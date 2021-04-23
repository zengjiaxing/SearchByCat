<template>
	<div id="app">
		<index></index>
	</div>
</template>

<script>
	import index from './components/index.vue'
	import home from './components/home.vue'
	export default {
		name: 'App',
		components: {
			index,
			home
		}
	}
</script>

<style>
	body {
		margin: 0;
	}

	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		margin-top: 0px;
	}

	a {
		text-decoration: none;
	}
</style>
