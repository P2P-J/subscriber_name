import { useState } from "react";
import {
  Modal,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Button,
} from "@/components/ui";

export function AdminLoginModal({ open, onClose, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const { error } = await onSignIn(email, password);
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    setEmail("");
    setPassword("");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <ModalTitle>관리자 로그인</ModalTitle>
        <ModalDescription>
          이름을 편집하려면 관리자 계정으로 로그인하세요.
        </ModalDescription>

        <div className="mt-5 space-y-3">
          <div>
            <label className="block text-[12px] font-medium text-[#6E4555] mb-1">
              이메일
            </label>
            <input
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#E8B4BC]/60 bg-white text-[14px] text-[#3A3238] outline-none focus:border-[#D282A6]"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-[#6E4555] mb-1">
              비밀번호
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] px-3 rounded-[8px] border border-[#E8B4BC]/60 bg-white text-[14px] text-[#3A3238] outline-none focus:border-[#D282A6]"
            />
          </div>
        </div>

        {error && (
          <p className="mt-3 text-[12px] text-red-600">
            로그인 실패: {error}
          </p>
        )}

        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={submitting}
          >
            취소
          </Button>
          <Button type="submit" disabled={submitting}>
            {submitting ? "로그인 중..." : "로그인"}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
