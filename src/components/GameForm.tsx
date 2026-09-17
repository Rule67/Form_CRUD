"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import type { Game, GameStatus } from "@/types/games";

export type GameDraft = {
  title: string;
  platform: string;
  expectedHours: string;
  status: GameStatus;
};

const emptyDraft: GameDraft = {
  title: "",
  platform: "",
  expectedHours: "",
  status: "ยังไม่เริ่ม",
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

function validate(value: GameDraft): FormErrors {
  const errors: FormErrors = {};
  if (value.title.trim() === "") errors.title = "กรุณากรอกชื่อเกม";
  if (value.platform.trim() === "") errors.platform = "กรุณาเลือกแพลตฟอร์ม";
  
  const hours = Number(value.expectedHours);
  if (!Number.isFinite(hours) || hours <= 0) {
    errors.expectedHours = "จำนวนชั่วโมงต้องเป็นตัวเลขบวก";
  }
  return errors;
}

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(
    initialGame
      ? {
          title: initialGame.title,
          platform: initialGame.platform,
          expectedHours: String(initialGame.expectedHours),
          status: initialGame.status,
        }
      : emptyDraft
  );
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="form-container">
      <h2 className="form-title">
        {initialGame ? 
        (<> <img src="/games/pen.png" alt="Edit" style={{ width: "20px", height: "15px", marginRight: "1px" }} /> แก้ไขรายการเกม</>) 
        : 
        (<> เพิ่มรายการ GAMES <img src="/games/oldgame.png" alt="Old" style={{ width: "50px", height: "30px", marginRight: "1px" }} /> </>)}
      </h2>

      <div className="form-grid">
        <div className="form-group full-width">
          <label htmlFor="title">ชื่อเกม <span className="required">*</span></label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="เช่น Elden Ring, Zelda..."
            value={draft.title}
            onChange={handleChange}
            className={`form-input ${errors.title ? "input-error" : ""}`}
          />
          {errors.title && <p className="error-text">{errors.title}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="platform">แพลตฟอร์ม <span className="required">*</span></label>
          <select
            id="platform"
            name="platform"
            value={draft.platform}
            onChange={handleChange}
            className={`form-select ${errors.platform ? "input-error" : ""}`}
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PS5">PS5</option>
            <option value="Nintendo Switch">Nintendo Switch</option>
            <option value="Xbox">Xbox</option>
            <option value="Mobile">Mobile</option>
          </select>
          {errors.platform && <p className="error-text">{errors.platform}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="expectedHours">เวลาที่คาดว่าจะใช้ (ชั่วโมง) <span className="required">*</span></label>
          <input
            id="expectedHours"
            name="expectedHours"
            type="number"
            min="0.1"
            step="0.1"
            placeholder="เช่น 10"
            value={draft.expectedHours}
            onChange={handleChange}
            className={`form-input ${errors.expectedHours ? "input-error" : ""}`}
          />
          {errors.expectedHours && <p className="error-text">{errors.expectedHours}</p>}
        </div>

        <div className="form-group full-width">
          <label htmlFor="status">สถานะเกม</label>
          <select
            id="status"
            name="status"
            value={draft.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="ยังไม่เริ่ม">ยังไม่เริ่ม</option>
            <option value="กำลังเล่น">กำลังเล่น</option>
            <option value="เล่นจบแล้ว">เล่นจบแล้ว</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          <img src="/games/Fdisk.png" alt="FD" style={{ width: "18px", height: "15px", marginRight: "1px" }} /> 
          บันทึกข้อมูล
        </button>
        {initialGame && (
          <button type="button" onClick={onCancel} className="btn btn-cancel">
            ✕ ยกเลิก
          </button>
        )}
      </div>
    </form>
  );
}