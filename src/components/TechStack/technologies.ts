import Technology from '@/types/components/TechStack/Technology.type'

import drf from '@/assets/images/technologies/drf.png'
import vue from '@/assets/images/technologies/vue.png'
import nuxt from '@/assets/images/technologies/nuxt.png'
import sass from '@/assets/images/technologies/sass.png'
import mysql from '@/assets/images/technologies/mysql.png'
import node from '@/assets/images/technologies/nodejs.png'
import redis from '@/assets/images/technologies/redis.png'
import django from '@/assets/images/technologies/django.png'
import docker from '@/assets/images/technologies/docker.png'
import javascript from '@/assets/images/technologies/js.png'
import mongo from '@/assets/images/technologies/mongodb.png'
import python from '@/assets/images/technologies/python.png'
import typescript from '@/assets/images/technologies/ts.png'
import angular from '@/assets/images/technologies/angular.png'
import grafana from '@/assets/images/technologies/grafana.png'
import cadvisor from '@/assets/images/technologies/cadvisor.png'
import postgres from '@/assets/images/technologies/postgres.png'
import bootstrap from '@/assets/images/technologies/bootstrap.png'
import materialui from '@/assets/images/technologies/materialui.png'
import prometheus from '@/assets/images/technologies/prometheus.png'
import bootstrapvue from '@/assets/images/technologies/bootstrapvue.png'

const technologies: Array<Technology> = [
    { name: 'JavaScript', image: javascript },
    { name: 'TypeScript', image: typescript },
    { name: 'NodeJS', image: node },
    { name: 'Python', image: python },
    { name: 'Django', image: django },
    { name: 'Django Rest Framework', image: drf },
    { name: 'Vue', image: vue },
    { name: 'NuxtJS', image: nuxt },
    { name: 'Angular', image: angular },
    { name: 'Sass/Scss', image: sass },
    { name: 'Bootstrap', image: bootstrap },
    { name: 'BootstrapVue', image: bootstrapvue },
    { name: 'Material UI', image: materialui },
    { name: 'Docker', image: docker },
    { name: 'Redis', image: redis },
    { name: 'MySQL', image: mysql },
    { name: 'PostgreSQL', image: postgres },
    { name: 'MongoDB', image: mongo },    
    { name: 'Prometheus', image: prometheus },
    { name: 'Grafana', image: grafana },
    { name: 'cAdvisor', image: cadvisor },
]

export default technologies