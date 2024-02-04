k8s_yaml('/kubernetes/counting.yaml')
k8s_yaml('/kubernetes/counting-service.yaml')
k8s_yaml('/kubernetes/frontend.yaml')
k8s_yaml('/kubernetes/frontend-service.yaml')
k8s_yaml('/kubernetes/statistics.yaml')
k8s_yaml('/kubernetes/statistics-service.yaml')

docker_build('counting', './backend', target='dev', live_update=[sync('./backend/apps/counting', '/usr/src/app/apps/counting'), sync('./backend/shared', '/usr/src/app/shared')], build_args={'service': 'counting'})
docker_build('statistics', './backend', target='dev', live_update=[sync('./backend/apps/statistics', '/usr/src/app/apps/statistics'), sync('./backend/shared', '/usr/src/app/shared')], build_args={'service': 'statistics'})
docker_build('frontend', './frontend', target='dev', live_update=[sync('./frontend/app', '/usr/src/app/app'), sync('./frontend/components', '/usr/src/app/components')])

k8s_resource(workload='counting', port_forwards='29000:3000')
k8s_resource(workload='statistics', port_forwards='29001:3000')
