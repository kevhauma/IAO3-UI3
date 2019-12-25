const routes = [
	{
		path: '/',		
		component: () => import('layouts/MyLayout.vue'),
		children: [
		{ 
			path: '',
			name: 'index', 
			component: () => import('pages/Index.vue') 
		},
		{
			path: '/department/:id',
			name: 'department',
			component: () => import('pages/Department.vue'),
		},
		{
			path: '/patient/:id',
			name: 'patient',
			component: () => import('pages/Patient.vue'),	
		}]
	}
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
	routes.push({
		path: '*',
		component: () => import('pages/Error404.vue')
	})
}

export default routes
