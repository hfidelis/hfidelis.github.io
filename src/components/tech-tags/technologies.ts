import Technology from '@/types/components/tech-stack/Technology.type'

import aws from '@/assets/images/technologies/aws.png'
import drf from '@/assets/images/technologies/drf.png'
import vue from '@/assets/images/technologies/vue.png'
import mui from '@/assets/images/technologies/mui.png'
import nuxt from '@/assets/images/technologies/nuxt.png'
import sass from '@/assets/images/technologies/sass.png'
import qemu from '@/assets/images/technologies/qemu.png'
import flask from '@/assets/images/technologies/flask.png'
import linux from '@/assets/images/technologies/linux.png'
import mysql from '@/assets/images/technologies/mysql.png'
import node from '@/assets/images/technologies/nodejs.png'
import redis from '@/assets/images/technologies/redis.png'
import react from '@/assets/images/technologies/react.png'
import celery from '@/assets/images/technologies/celery.png'
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
import tailwind from '@/assets/images/technologies/tailwind.png'
import terraform from '@/assets/images/technologies/terraform.png'
import bootstrap from '@/assets/images/technologies/bootstrap.png'
import prometheus from '@/assets/images/technologies/prometheus.png'
import nodexporter from '@/assets/images/technologies/nodexporter.png'
import bootstrapvue from '@/assets/images/technologies/bootstrapvue.png'

const technologies: Array<Technology> = [
  { name: 'JavaScript', image: javascript },
  { name: 'TypeScript', image: typescript },
  { name: 'Python', image: python },

  { name: 'NodeJS', image: node },
  { name: 'QEMU', image: qemu },

  { name: 'Django', image: django },
  { name: 'Django Rest Framework', image: drf },
  { name: 'Flask', image: flask },
  { name: 'Celery', image: celery },

  { name: 'Vue', image: vue },
  { name: 'NuxtJS', image: nuxt },
  { name: 'Angular', image: angular },
  { name: 'React', image: react },

  { name: 'Sass/Scss', image: sass },
  { name: 'TailwindCSS', image: tailwind },
  { name: 'Bootstrap', image: bootstrap },
  { name: 'BootstrapVue', image: bootstrapvue },
  { name: 'Material UI', image: mui },

  { name: 'MySQL', image: mysql },
  { name: 'PostgreSQL', image: postgres },
  { name: 'MongoDB', image: mongo },
  { name: 'Redis', image: redis },

  { name: 'Prometheus', image: prometheus },
  { name: 'Node Exporter', image: nodexporter },
  { name: 'Grafana', image: grafana },
  { name: 'cAdvisor', image: cadvisor },

  { name: 'Docker', image: docker },
  { name: 'Terraform', image: terraform },
  { name: 'AWS', image: aws },
  { name: 'Linux', image: linux },
]

export default technologies