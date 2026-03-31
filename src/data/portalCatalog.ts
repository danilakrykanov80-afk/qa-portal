import { bothunterService } from "@/data/bothunterSections";
import { Section, Service } from "@/data/portalTypes";

export const services: Service[] = [bothunterService];

export const getServices = () => services;

export const getServiceSlugs = () => services.map((service) => service.slug);

export const getServiceBySlug = (serviceSlug: string) =>
  services.find((service) => service.slug === serviceSlug);

export const getNetworkBySlug = (service: Service, networkSlug: string) =>
  service.networks.find((network) => network.slug === networkSlug);

export const getNetworkSlugs = (service: Service) =>
  service.networks.map((network) => network.slug);

export const getEnvironmentBySlug = (service: Service, environmentSlug: string) =>
  service.environments.find((environment) => environment.slug === environmentSlug);

export const getEnvironmentSlugs = (service: Service) =>
  service.environments.map((environment) => environment.slug);

export const getSectionBySlug = (service: Service, sectionSlug: string) =>
  service.sections.find((section) => section.slug === sectionSlug);

export const getSectionSlugs = (service: Service) =>
  service.sections.map((section) => section.slug);

export const getTestTypeBySlug = (section: Section, testTypeSlug: string) =>
  section.testTypes.find((testType) => testType.slug === testTypeSlug);

export const getTestTypeSlugs = (section: Section) =>
  section.testTypes.map((testType) => testType.slug);
