import { createSection, SectionSeed, apiDocsUrl, sheets, spreadsheetUrl, workbookId } from "@/data/catalogCore";
import { Service } from "@/data/portalTypes";

const bothunterSectionSeeds: SectionSeed[] = [
  { docId: "DOC-HOME", slug: "home", label: "Главная", group: "Навигация", route: "/g109479", pagePurpose: "Точка входа в продукт и навигационный хаб по всем модулям BotHunter.", qaFocus: "Критические переходы, доступность ключевых разделов, роль стартового экрана.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke", "regression"] },
  { docId: "DOC-USERS", slug: "users", label: "Пользователи", group: "Пользователи", route: "/g109479/contacts", pagePurpose: "База пользователей с карточками, фильтрами и переходом к коммуникациям.", qaFocus: "Список, фильтры, массовые действия и переход в диалоги.", testCasesCount: 3, checklistsCount: 3, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "ux", "smoke", "regression", "integration"] },
  { docId: "DOC-LISTS", slug: "lists", label: "Списки", group: "Пользователи", route: "/g109479/contacts/lists/g109479", pagePurpose: "Группировка пользователей по рабочим спискам и сегментам.", qaFocus: "Создание, открытие, удаление и корректность счетчиков.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke", "regression"] },
  { docId: "DOC-VARIABLES", slug: "variables", label: "Переменные", group: "Пользователи", route: "/g109479/contacts/variables", pagePurpose: "Управление пользовательскими и системными переменными для персонализации.", qaFocus: "Создание, редактирование, валидация названий и влияние на рассылки/ботов.", testCasesCount: 2, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "regression"] },
  { docId: "DOC-DIALOGS", slug: "dialogs", label: "Диалоги", group: "Коммуникации", route: "/g109479/dialogs", pagePurpose: "Ручная работа с диалогами и историей общения с пользователями.", qaFocus: "Поиск, пустые состояния и связка с карточкой пользователя.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke", "regression", "integration"] },
  { docId: "DOC-MAILINGS", slug: "mailings", label: "Рассылки", group: "Коммуникации", route: "/g109479/mailer/mailing", pagePurpose: "Создание, запуск и сопровождение сценариев массовых рассылок.", qaFocus: "Жизненный цикл рассылки, статусы, каналы доставки и релизный smoke.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke", "regression", "integration", "load"] },
  { docId: "DOC-MAILINGS-STATS", slug: "mailings-statistics", label: "Статистика рассылок", group: "Коммуникации", route: "/g109479/mailer/mailing/statistics", pagePurpose: "Аналитика доставки, ошибок и фильтрация рассылочной статистики.", qaFocus: "Фильтры, реальные delivery-ошибки и корректность статусных срезов.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "analytics", "regression"] },
  { docId: "DOC-BOTS", slug: "bots", label: "Чат-боты", group: "Автоматизация", route: "/g109479/bots", pagePurpose: "Управление ботами, их статусами и жизненным циклом.", qaFocus: "Создание, статусы, доступность действий и связи с каналами.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke", "regression", "integration"] },
  { docId: "DOC-BOT-TEMPLATES", slug: "bot-templates", label: "Готовые шаблоны", group: "Автоматизация", route: "/g109479/bots/templates", pagePurpose: "Каталог шаблонов ботов и стартовых сценариев.", qaFocus: "Доступность каталога, открытие шаблона и отсутствие битых карточек.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke"] },
  { docId: "DOC-INTEGRATIONS", slug: "integrations", label: "Интеграции", group: "Автоматизация", route: "/g109479/integrations", pagePurpose: "Подключение сторонних сервисов и запуск мастеров интеграции.", qaFocus: "Список провайдеров, ошибки подключения и зависимость от внешних API.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "integration", "api", "regression", "load"] },
  { docId: "DOC-WEBHOOKS", slug: "webhooks", label: "Вебхуки", group: "Автоматизация", route: "/g109479/webhooks", pagePurpose: "Настройка webhook-получателей и просмотр истории отправок.", qaFocus: "URL-валидация, история ошибок доставки и интеграционные сценарии.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "integration", "api", "regression", "load"] },
  { docId: "DOC-MINI-LANDINGS", slug: "mini-landings", label: "Мини-лендинги", group: "Страницы", route: "/g109479/pages/mini-landings", pagePurpose: "Создание и управление мини-лендингами и публичными страницами.", qaFocus: "Создание, публичная доступность, карточки и подписочные действия.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "ux", "regression", "integration"] },
  { docId: "DOC-MINI-LANDINGS-STATS", slug: "mini-landings-statistics", label: "Статистика мини-лендингов", group: "Страницы", route: "/g109479/pages/mini-landings/statistics", pagePurpose: "Аналитика просмотров, подписок и UTM-атрибуции мини-лендингов.", qaFocus: "UTM-фильтры, корректность выборки и аналитические срезы.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "analytics", "regression"] },
  { docId: "DOC-FUNNELS", slug: "funnels", label: "Воронки", group: "Аналитика", route: "/g109479/analytics/funnels", pagePurpose: "Создание и сопровождение аналитических воронок.", qaFocus: "Карточки, аналитические поля и безопасный рендер пользовательского ввода.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 1, testTypeSlugs: ["functional", "ui", "analytics", "regression", "security"] },
  { docId: "DOC-GOALS", slug: "goals", label: "Цели", group: "Аналитика", route: "/g109479/analytics/goals", pagePurpose: "Настройка и поддержка аналитических целей.", qaFocus: "Формы, события, условия и безопасное отображение пользовательских строк.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "analytics", "regression", "security"] },
  { docId: "DOC-REPORTS", slug: "reports", label: "Отчеты", group: "Аналитика", route: "/g109479/analytics/reports", pagePurpose: "Просмотр отчетов и результатов аналитических построений.", qaFocus: "Фильтры, пустые состояния и согласованность списка отчетов.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "analytics", "regression"] },
  { docId: "DOC-START-PARAMS", slug: "start-params", label: "Стартовые параметры", group: "Аналитика", route: "/g109479/analytics/start-params-hits/stats", pagePurpose: "Статистика входов по стартовым параметрам бота.", qaFocus: "Фильтры, аналитические срезы и стабильность пустых состояний.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "analytics", "regression"] },
  { docId: "DOC-UTM", slug: "utm-generator", label: "Генератор UTM-меток", group: "Инструменты", route: "/g109479/tools/utm-label", pagePurpose: "Генерация корректных ссылок с UTM-метками для атрибуции.", qaFocus: "Валидация обязательных полей и точность итоговой ссылки.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke", "regression"] },
  { docId: "DOC-JSON", slug: "json-beautifier", label: "JSON Beautifier", group: "Инструменты", route: "/g109479/tools/json-beautify", pagePurpose: "Форматирование и просмотр JSON в удобном виде.", qaFocus: "Позитивные и негативные сценарии, дерево значений и ошибки без падения UI.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "regression"] },
  { docId: "DOC-CONNECTIONS", slug: "connections", label: "Подключения", group: "Настройки", route: "/g109479/settings/connections", pagePurpose: "Управление подключенными каналами и их состояниями.", qaFocus: "Статусы каналов, переподключение и интеграционные переходы.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "integration", "regression", "api"] },
  { docId: "DOC-NOTIFICATIONS", slug: "notifications", label: "Уведомления", group: "Настройки", route: "/g109479/settings/notifications", pagePurpose: "Настройка уведомлений пользователя или проекта.", qaFocus: "Выход из loading-state, стабильность формы и готовность к баг-фиксации.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 1, testTypeSlugs: ["functional", "ui", "smoke", "regression"] },
  { docId: "DOC-PROCESSES", slug: "processes", label: "Процессы", group: "Дополнительно", route: "/g109479/more/processes", pagePurpose: "Мониторинг фоновых процессов и их статусных вкладок.", qaFocus: "Вкладки, пустые состояния и корректное отображение long-running задач.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "smoke"] },
  { docId: "DOC-AUTOEXPORT", slug: "autoexport", label: "Автоэкспорт", group: "Дополнительно", route: "/g109479/more/autoexport", pagePurpose: "Планирование регулярных экспортов и расписаний задач.", qaFocus: "Создание задач, расписание, safe rendering пользовательских названий и интеграционные выгрузки.", testCasesCount: 2, checklistsCount: 2, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "regression", "security", "api", "load"] },
  { docId: "DOC-EXPORT-RESULTS", slug: "export-results", label: "Результаты экспорта", group: "Дополнительно", route: "/g109479/more/export-results", pagePurpose: "Ручная выгрузка данных по сущностям и форматам.", qaFocus: "Выбор сущности, формата, фильтров и формирование файла без ошибок.", testCasesCount: 1, checklistsCount: 1, bugReportsCount: 0, testTypeSlugs: ["functional", "ui", "regression", "api"] }
];

export const bothunterService: Service = {
  slug: "bothunter",
  label: "BotHunter",
  summary: "Навигационный QA-портал для тестировщиков и разработчиков с картой разделов, типов тестирования и быстрыми переходами в таблицы.",
  audience: "QA, разработка, аналитики, тимлиды",
  status: "MVP на одном сервисе",
  productUrl: "https://bot-new.targethunter.ru/",
  spreadsheetUrl,
  apiDocsUrl,
  workbookId,
  metrics: { sections: 24, testCases: 34, checklists: 33, bugTemplates: 2 },
  highlights: [
    "Одна точка входа для QA и разработки.",
    "Кликабельная карта разделов BotHunter.",
    "Типы тестирования отделены от артефактов хранения.",
    "Таблицы docs.targethunter.ru остаются источником правды."
  ],
  environments: [
    {
      slug: "stage",
      label: "Stage",
      summary: "РўРµСЃС‚РѕРІРѕРµ РѕРєСЂСѓР¶РµРЅРёРµ РґР»СЏ РїСЂРѕРІРµСЂРєРё РЅРѕРІС‹С… С„РёС‡, smoke-РїСЂРѕС…РѕРґР° Рё regression РїРµСЂРµРґ prod.",
      productUrl: "https://bot-staging.targethunter.dev/",
      cookieUrl: "https://targethunter.dev/dev_cookie",
    },
    {
      slug: "prod",
      label: "Production",
      summary: "Р‘РѕРµРІРѕРµ РѕРєСЂСѓР¶РµРЅРёРµ РґР»СЏ С„РёРЅР°Р»СЊРЅРѕР№ РїСЂРѕРІРµСЂРєРё РєСЂРёС‚РёС‡РЅС‹С… user-flow Рё РїРѕРІРµРґРµРЅРёСЏ СЃРµСЂРІРёСЃР° РЅР° СЂРµР°Р»СЊРЅРѕРј РєРѕРЅС‚СѓСЂРµ.",
      productUrl: "https://bot-new.targethunter.ru/",
    },
  ],
  sheets,
  networks: [
    { slug: "vk", label: "ВК" },
    { slug: "tg", label: "ТГ" },
    { slug: "ok", label: "ОК" },
    { slug: "max", label: "MAX" },
  ],
  sections: bothunterSectionSeeds.map(createSection)
};
