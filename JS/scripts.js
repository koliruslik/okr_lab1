
/*
   1. ФУНКЦІЯ «Діалог з користувачем» (alert, prompt, confirm, if, for)
   Механіка: Кидок ініціативи (D20)
*/
function rollInitiativeDialog() {
    let playerName = prompt("Майстер Гри: Як звуть твого персонажа?", "Мандрівник");
    if (!playerName || playerName.trim() === "") {
        alert("Ти не назвав себе. Будеш відомий як 'Невідомий Герой'.");
        playerName = "Невідомий Герой";
    }
    const isReady = confirm("Попереду ворог! Готовий кинути d20 на ініціативу, " + playerName + "?");
    let message = "";
    if (isReady) {
        let rollAnim = "Кубик котиться: ";
        for (let i = 1; i <= 3; i++) {
            rollAnim += i + "... ";
        }
        alert(rollAnim);
        let d20 = Math.floor(Math.random() * 20) + 1;
        let rerolls = 1;

        while (rerolls > 0) {
            if (d20 === 20) {
                message = "🎲 " + d20 + "! КРИТИЧНИЙ УСПІХ! " + playerName + " атакує першим!";
                break;
            } else if (d20 === 1) {
                const wantReroll = confirm(
                    "💀 Критичний провал! На кубику: " + d20 +
                    "\nВикористати Перекидання Долі? (залишилось: " + rerolls + ")"
                );
                if (wantReroll) {
                    rerolls--;
                    d20 = Math.floor(Math.random() * 20) + 1;
                } else {
                    message = "🎲 " + d20 + "... Провал. Ворог застає тебе зненацька.";
                    break;
                }
            } else {
                const wantReroll = confirm(
                    "🎲 На кубику: " + d20 + ". Бій починається!" +
                    "\nПерекинути? (залишилось: " + rerolls + ")"
                );
                if (wantReroll) {
                    rerolls--;
                    d20 = Math.floor(Math.random() * 20) + 1;
                } else {
                    message = "🎲 " + d20 + ". " + playerName + " іде в бій!";
                    break;
                }
            }
        }

        if (message === "") {
            if (d20 === 20) message = "🎲 " + d20 + "! КРИТИЧНИЙ УСПІХ після перекидання!";
            else if (d20 === 1) message = "🎲 " + d20 + "... Навіть Доля не врятувала.";
            else message = "🎲 " + d20 + ". " + playerName + " іде в бій (після перекидання)!";
        }

    } else {
        message = playerName + " відступає в тіні. Бій уникнуто... поки що.";
    }

    alert(message);
}

/*
   2. Функція з параметром за замовчуванням
   Механіка: Спавн персонажа на сцені
*/
function spawnCharacter(name, characterClass = "Воїн") {
    const heroInfo =
        "⚔️ ІНФОРМАЦІЯ ПРО ГЕРОЯ ⚔️\n\n" +
        "Ім'я: " + name + "\n" +
        "Клас: " + characterClass + "\n" +
        "Статус: Готовий до бою!";
    alert(heroInfo);
}

/*
   3. Функція порівняння двох рядків
   Механіка: Визначення пріоритету атаки за довжиною назви
*/
function resolveClash(fighter1, fighter2) {
    if (fighter1 === fighter2) {
        alert("Зіткнулися два однакових бійця (" + fighter1 + "). Їх зброя схрестилася, нічия!");
    } else {
        const winner = fighter1.length >= fighter2.length ? fighter1 : fighter2;
        alert("Б'ються «" + fighter1 + "» та «" + fighter2 + "».\n\nЗа правилами пріоритету системи, удар першим наносить: 👑 " + winner + "!");
    }
}

/*
   4. Зміна фону сторінки (BOM / DOM стилі)
   Механіка: Перехід в кімнату Боса
*/
function triggerBossState() {
    const originalBg = document.body.style.backgroundColor || "#f0f4f8";
    const timer = 30000;
    document.body.style.backgroundColor = "#2c0000";
    document.body.style.transition = "background-color 1s ease";

    const bossWarning = document.createElement("div");
    bossWarning.id = "boss-warning";
    bossWarning.textContent = "☠️ УВАГА! НАБЛИЖАЄТЬСЯ БОС! ☠️";
    bossWarning.style.cssText =
        "position:fixed;top:50%;left:50%;transform:translate(-50%, -50%);" +
        "background:rgba(0,0,0,0.8);color:#e74c3c;padding:30px;border:3px solid #e74c3c;" +
        "font-size:30px;z-index:9999;font-weight:bold;";
    document.body.appendChild(bossWarning);

    setTimeout(function () {
        document.body.style.backgroundColor = originalBg;
        const el = document.getElementById("boss-warning");
        if (el) el.remove();
    }, timer);
}

function fleeToTavern() {
    if (confirm("Здоров'я критичне! Бажаєте втекти до головної сторінки?")) {
        location.href = "index.html";
    }
}

function levelUpMechanic() {
    let titleEl = document.querySelector(".section-header");
    if (titleEl && !titleEl.textContent.includes("LEVEL UP")) {
        titleEl.textContent = titleEl.textContent + " [LEVEL UP!]";
        titleEl.style.color = "#f1c40f";
    }

    const tags = document.querySelectorAll(".tag");
    tags.forEach(function (tag) {
        if (!tag.innerHTML.includes("⚡")) {
            tag.innerHTML = "⚡ " + tag.innerHTML;
            tag.style.borderColor = "#f1c40f";
        }
    });

    const statValues = document.querySelectorAll(".stat-value");
    statValues.forEach(function(stat) {
        let currentValue = parseInt(stat.textContent);
        if (!isNaN(currentValue)) {
            stat.textContent = currentValue + 5;
            stat.style.color = "#27ae60";
        }
    });

    const navLinks = document.querySelectorAll("nav a");
    if (navLinks.length > 0) {
        const textNode = navLinks[0].firstChild;
        if (textNode && textNode.nodeType === Node.TEXT_NODE) {
            console.log("Лог рушія: Отримано nodeValue з навігації ->", textNode.nodeValue);
        }
    }

    const versionCard = document.getElementById("version-card");
    if (versionCard) {
        alert("HTML картка версії (outerHTML):\n\n" + versionCard.outerHTML);
    }
}

function openLootChest() {
    const placeholder = document.getElementById("chest-placeholder");
    if (!placeholder) {
        alert("Скриню вже відкрито! Шукай нову на наступному рівні.");
        return;
    }

    const inventoryPanel = document.createElement("div");
    inventoryPanel.id = "inventory-panel";
    inventoryPanel.style.cssText =
        "background:#fffbe7;border:2px solid #f1c40f;padding:15px;" +
        "border-radius:8px;margin-bottom:10px;";

    const sword = document.createElement("div");
    sword.textContent = "🗡️ Сталевий меч (Шкода: 1d8 + 2)";
    sword.style.color = "#2c3e50";
    inventoryPanel.appendChild(sword);

    const invTitle = document.createElement("h4");
    const invText = document.createTextNode("Відкритий Інвентар (Знайдено лут):");
    invTitle.appendChild(invText);
    invTitle.style.margin = "0 0 10px 0";
    inventoryPanel.prepend(invTitle);

    placeholder.replaceWith(inventoryPanel);

    const takeAllBtn = document.createElement("button");
    takeAllBtn.textContent = "🖐 Забрати все і закрити інвентар";
    takeAllBtn.className = "btn-js green";
    takeAllBtn.style.display = "block";
    takeAllBtn.style.marginTop = "10px";
    inventoryPanel.after(takeAllBtn);

    takeAllBtn.onclick = function() {
        if (confirm("Ти забираєш всі предмети. Очистити інтерфейс?")) {
            inventoryPanel.remove();
            takeAllBtn.remove();
        }
    };
}

function showDeveloper(lastName, firstName, role = "Розробник") {
    const info =
        "🎲 ПРОФІЛЬ РОЗРОБНИКА ГРИ 🎲\n\n" +
        "Прізвище : " + lastName  + "\n" +
        "Ім'я     : " + firstName + "\n" +
        "Клас/Роль: " + role + "\n" +
        "Місія    : Створення ідеальної d20 action гри!";
    alert(info);
}


/* ════════════════════════════════════════════════════════════
   БОЙОВИЙ ЖУРНАЛ — утиліта виведення повідомлень
════════════════════════════════════════════════════════════ */
function battleLog(msg, type) {
    const log = document.getElementById("battle-log");
    if (!log) return;

    const empty = log.querySelector(".bl-empty");
    if (empty) empty.remove();

    const icons = { success: "✅", warn: "⚠️", danger: "💀", info: "📜" };
    const icon  = icons[type] || "📜";

    const entry = document.createElement("div");
    entry.className = "bl-entry bl-" + (type || "info");
    entry.innerHTML =
        '<span class="bl-time">' + new Date().toLocaleTimeString("uk") + '</span>' +
        '<span class="bl-icon">' + icon + '</span>' +
        '<span class="bl-msg">' + msg + '</span>';

    log.prepend(entry);

    // Не більше 10 записів
    while (log.children.length > 10) log.removeChild(log.lastChild);
}


/* ════════════════════════════════════════════════════════════
   КАРТКИ ЗДІБНОСТЕЙ — події миші

   card-atk  → onmouseover через HTML-атрибут (onmouseover="...")
   card-mag  → onmouseover через властивість   (element.onmouseover = fn)
   card-def  → click: два окремі addEventListener
   card-fate → click: об'єкт fateHandler з handleEvent + event.currentTarget
   #btn-break-fate → removeEventListener: відв'язує fateHandler
════════════════════════════════════════════════════════════ */

/* Атака — обробник через атрибут (функція глобальна, викликається з HTML) */
function abilityHoverAttr(event) {
    event.currentTarget.classList.add("ac--hovered");
}
function abilityOutAttr(event) {
    event.currentTarget.classList.remove("ac--hovered");
}

/* Об'єкт-обробник для картки «Доля» */
var fateHandler = {
    rolls: 0,
    handleEvent: function(event) {
        this.rolls++;
        var roll   = Math.floor(Math.random() * 20) + 1;
        var target = event.currentTarget; // елемент, до якого прив'язано обробник

        var resultText, type;
        if (roll === 20) {
            resultText = "🌟 КРИТИЧНИЙ УСПІХ (d20 = " + roll + ")";
            type = "success";
        } else if (roll === 1) {
            resultText = "💀 КРИТИЧНИЙ ПРОВАЛ (d20 = " + roll + ")";
            type = "danger";
        } else {
            resultText = "🎲 Доля кидає " + roll;
            type = "info";
        }

        // Показуємо результат у самій картці
        var statEl = target.querySelector(".ac-stat");
        if (statEl) statEl.textContent = "d20 = " + roll + " (кидок #" + this.rolls + ")";

        battleLog(resultText + " — кидків всього: " + this.rolls, type);
    }
};

function initAbilityCards() {
    /* --- card-mag: властивість .onmouseover --- */
    var cardMag = document.getElementById("card-mag");
    if (cardMag) {
        cardMag.onmouseover = function(event) {
            event.currentTarget.classList.add("ac--hovered");
        };
        cardMag.onmouseout = function(event) {
            event.currentTarget.classList.remove("ac--hovered");
        };
    }

    /* --- card-def: два addEventListener на одну подію 'click' --- */
    var cardDef = document.getElementById("card-def");
    if (cardDef) {
        // Перший обробник: анімує картку
        cardDef.addEventListener("click", function(event) {
            var el = event.currentTarget;
            el.classList.add("ac--clicked");
            setTimeout(function() { el.classList.remove("ac--clicked"); }, 400);
        });
        // Другий обробник: записує у журнал
        cardDef.addEventListener("click", function(event) {
            var roll = Math.floor(Math.random() * 6) + 1;
            battleLog("🛡️ Захист активовано! Поглинуто " + roll + " шкоди.", "info");
        });
    }

    /* --- card-fate: об'єкт fateHandler з handleEvent --- */
    var cardFate = document.getElementById("card-fate");
    if (cardFate) {
        cardFate.addEventListener("click", fateHandler);
    }

    /* --- #btn-break-fate: removeEventListener видаляє fateHandler --- */
    var breakBtn = document.getElementById("btn-break-fate");
    if (breakBtn) {
        breakBtn.addEventListener("click", function() {
            var cardFate = document.getElementById("card-fate");
            if (cardFate) {
                cardFate.removeEventListener("click", fateHandler);

                var flavor = cardFate.querySelector(".ac-flavor");
                if (flavor) flavor.textContent = "Кубик зламано. Доля мовчить.";

                var statEl = cardFate.querySelector(".ac-stat");
                if (statEl) statEl.textContent = "— недоступно —";

                cardFate.classList.add("ac--broken");
            }
            breakBtn.textContent = "⛓️ Кубик Долі вже зламано";
            breakBtn.disabled = true;
            battleLog("⛓️ Кубик Долі зламано. Більше не відповідає на кліки.", "warn");
        });
    }
}


/* ════════════════════════════════════════════════════════════
   СПИСОК ЗДІБНОСТЕЙ — делегування подій

   Один обробник onclick на <ul id="skill-list">.
   event.target — конкретний <li>, на який натиснули.
   event.currentTarget — завжди <ul>.
════════════════════════════════════════════════════════════ */
function initSkillList() {
    var list = document.getElementById("skill-list");
    if (!list) return;

    var activeItem = null;

    list.onclick = function(event) {
        if (event.target.tagName !== "LI") return;

        if (activeItem) activeItem.classList.remove("skill--active");
        activeItem = event.target;
        activeItem.classList.add("skill--active");

        var name = activeItem.textContent.replace(/\s+\S+ AP\s*$/, "").trim();
        battleLog("⚔️ Активна здібність: <b>" + name + "</b>", "info");
    };
}


/* ════════════════════════════════════════════════════════════
   ПАНЕЛЬ БОЙОВИХ ДІЙ — делегування через data-action

   Один addEventListener на #combat-menu.
   Читає data-action натиснутої кнопки й викликає відповідну функцію.
════════════════════════════════════════════════════════════ */
function combatRollInitiative() {
    var roll = Math.floor(Math.random() * 20) + 1;
    var msg  = roll === 20
        ? "🌟 Ініціатива: КРИТ! Твій хід першим (d20 = " + roll + ")"
        : "🎲 Ініціатива кинута: d20 = " + roll;
    battleLog(msg, roll >= 15 ? "success" : "info");
}

function combatHealHero() {
    var hp = Math.floor(Math.random() * 8) + 3;
    battleLog("💚 Зцілення: відновлено " + hp + " HP", "success");
}

function combatCastSpell() {
    var spells = ["Льодяна стріла", "Кулька вогню", "Темна блискавка", "Крижаний вихор"];
    var spell  = spells[Math.floor(Math.random() * spells.length)];
    var dmg    = Math.floor(Math.random() * 10) + 5;
    battleLog("✨ " + spell + " завдає " + dmg + " магічної шкоди!", "success");
}

function combatSummonBoss() {
    var bosses = ["Лорд Темряви", "Великий Дракон", "Стародавній Лич", "Король Тіней"];
    var boss   = bosses[Math.floor(Math.random() * bosses.length)];
    battleLog("☠️ " + boss + " з'явився! Тремти, герою.", "danger");
    triggerBossState();
}

function initCombatMenu() {
    var menu = document.getElementById("combat-menu");
    if (!menu) return;

    var actions = {
        rollInitiative: combatRollInitiative,
        healHero:       combatHealHero,
        castSpell:      combatCastSpell,
        summonBoss:     combatSummonBoss
    };

    menu.addEventListener("click", function(event) {
        var btn = event.target.closest("[data-action]");
        if (!btn) return;
        var actionName = btn.dataset.action;
        if (typeof actions[actionName] === "function") {
            actions[actionName]();
        }
    });
}


/* ════════════════════════════════════════════════════════════
   ПРИЙОМ «ПОВЕДІНКА» — data-behavior

   Скрипт при завантаженні знаходить усі [data-behavior]
   і автоматично додає поведінку залежно від значення атрибута.
   Жодного класу чи id не потрібно — лише атрибут.
════════════════════════════════════════════════════════════ */
function behaviorTooltip(el) {
    var tipText = el.dataset.tip || "";
    if (!tipText) return;

    var tip = document.createElement("span");
    tip.className = "artifact-tooltip";
    tip.textContent = tipText;
    el.appendChild(tip);

    el.addEventListener("mouseenter", function() { tip.style.display = "block"; });
    el.addEventListener("mouseleave", function() { tip.style.display = "none"; });
}

function behaviorConfirmAction(el) {
    var message = el.dataset.message || "Ви впевнені?";
    el.addEventListener("click", function() {
        if (confirm(message)) {
            battleLog("📜 Сувій використано! Втрачено 50 HP.", "danger");
        } else {
            battleLog("📜 Використання сувою скасовано.", "info");
        }
    });
}

function behaviorChargeCounter(el) {
    var max = parseInt(el.dataset.max) || 10;
    el.addEventListener("input", function() {
        var val = parseInt(el.value);
        if (isNaN(val)) { el.value = 0; return; }
        if (val > max) {
            el.value = max;
            battleLog("⚡ Посох заряджено до максимуму (" + max + " зарядів).", "warn");
        }
        if (val < 0) el.value = 0;
    });
}

function initBehaviors() {
    var handlers = {
        "tooltip":        behaviorTooltip,
        "confirm-action": behaviorConfirmAction,
        "charge-counter": behaviorChargeCounter
    };

    document.querySelectorAll("[data-behavior]").forEach(function(el) {
        var name = el.dataset.behavior;
        if (typeof handlers[name] === "function") {
            handlers[name](el);
        }
    });
}


/* ════════════════════════════════════════════════════════════
   ІНІЦІАЛІЗАЦІЯ
════════════════════════════════════════════════════════════ */
document.addEventListener("DOMContentLoaded", function() {
    initAbilityCards();
    initSkillList();
    initCombatMenu();
    initBehaviors();
});
